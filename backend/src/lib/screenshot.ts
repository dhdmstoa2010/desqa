import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { chromium, type Browser, type Page } from "playwright";

export class ScreenshotError extends Error {}

const PRIVATE_V4 = [
  /^0\./,
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./, // CGNAT 100.64.0.0/10
];

function isPrivateAddress(addr: string): boolean {
  if (isIP(addr) === 6) {
    const v6 = addr.toLowerCase();
    return (
      v6 === "::1" ||
      v6 === "::" ||
      v6.startsWith("fe80:") || // link-local
      v6.startsWith("fc") ||
      v6.startsWith("fd") || // unique local
      v6.startsWith("::ffff:") // IPv4-mapped — resolve the embedded v4 separately
    );
  }
  return PRIVATE_V4.some((re) => re.test(addr));
}

/** Parse + SSRF-guard a user-supplied URL. Throws ScreenshotError on rejection. */
export async function assertPublicUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ScreenshotError("올바른 URL 형식이 아닙니다");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new ScreenshotError("http 또는 https URL만 평가할 수 있습니다");
  }

  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost")) {
    throw new ScreenshotError("내부 주소는 평가할 수 없습니다");
  }

  // Resolve every A/AAAA record and reject if any points inside a private range.
  let addrs: string[];
  if (isIP(host)) {
    addrs = [host];
  } else {
    try {
      const records = await lookup(host, { all: true });
      addrs = records.map((r) => r.address);
    } catch {
      throw new ScreenshotError("도메인을 확인할 수 없습니다");
    }
  }

  if (addrs.length === 0 || addrs.some(isPrivateAddress)) {
    throw new ScreenshotError("내부 주소는 평가할 수 없습니다");
  }

  return url;
}

export type Screenshot = {
  /** PNG bytes, base64-encoded (no data: prefix). */
  base64: string;
  /** Final URL after redirects. */
  finalUrl: string;
  /** <title> of the loaded page, if any. */
  title: string;
};

/**
 * Known cookie-consent / GDPR / newsletter overlay containers (by id/class/attribute
 * substring). Removed outright before the screenshot so they don't dominate the review.
 */
const OVERLAY_SELECTORS = [
  "#onetrust-consent-sdk",
  "#onetrust-banner-sdk",
  ".onetrust-pc-dark-filter",
  "#CybotCookiebotDialog",
  "#CybotCookiebotDialogBodyUnderlay",
  "#usercentrics-root",
  "#cookiescript_injected",
  "[id*='sp_message_container']",
  "iframe[id*='sp_message_iframe']",
  "iframe[title*='consent' i]",
  "iframe[title*='cookie' i]",
  ".cc-window",
  ".cookie-consent",
  ".cookie-banner",
  ".cookie-notice",
  "[class*='CookieBanner']",
  "[class*='cookie-consent']",
  "[class*='gdpr']",
  "[aria-label*='cookie' i]",
  "[class*='newsletter-modal']",
  "[class*='NewsletterModal']",
  ".modal-backdrop",
  ".ReactModal__Overlay",
];

/**
 * Best-effort dismissal of modals, cookie walls and full-screen popups so the
 * screenshot reflects the actual page. Never throws.
 */
async function dismissOverlays(page: Page): Promise<void> {
  try {
    // ESC closes most accessible dialogs / lightboxes / consent sheets.
    await page.keyboard.press("Escape").catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});

    await page.evaluate((selectors: string[]) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 1. Known consent / modal containers.
      for (const sel of selectors) {
        document.querySelectorAll(sel).forEach((el) => el.remove());
      }

      // 2. Generic full-screen overlays: fixed/sticky, high z-index, covering
      //    most of the viewport. Short full-width bars hugging the top edge are
      //    kept — those are normal sticky headers, not blockers.
      for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
        const s = getComputedStyle(el);
        if (s.position !== "fixed" && s.position !== "sticky") continue;
        if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") continue;

        const r = el.getBoundingClientRect();
        const z = parseInt(s.zIndex, 10) || 0;
        const coversWidth = r.width >= vw * 0.9;
        const coversHeight = r.height >= vh * 0.5;
        const bigArea = r.width * r.height >= vw * vh * 0.4;
        const isStickyHeader = coversWidth && r.height < vh * 0.25 && r.top <= 4;

        if (isStickyHeader) continue;
        if (z >= 100 && (bigArea || (coversWidth && coversHeight))) {
          el.remove();
        }
      }

      // 3. Undo the scroll-lock a modal typically leaves on <html>/<body>.
      for (const node of [document.documentElement, document.body]) {
        node.style.overflow = "";
        node.style.position = "";
        node.style.paddingRight = "";
      }
    }, OVERLAY_SELECTORS);
  } catch {
    // Overlay cleanup is non-critical — capture the page regardless.
  }
}

let browserPromise: Promise<Browser> | null = null;

function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = chromium.launch({ headless: true }).catch((err) => {
      browserPromise = null;
      throw err;
    });
  }
  return browserPromise;
}

/** Load `url` in a headless browser and return an above-the-fold PNG screenshot. */
export async function captureScreenshot(url: URL): Promise<Screenshot> {
  const browser = await getBrowser();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 desqa-bot/1.0",
  });

  try {
    const page = await context.newPage();
    const response = await page.goto(url.toString(), {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    if (response && response.status() >= 400) {
      throw new ScreenshotError(
        `페이지를 불러오지 못했습니다 (HTTP ${response.status()})`,
      );
    }

    // Close cookie walls / modals / popups before capturing.
    await dismissOverlays(page);

    // Give late CSS / web fonts / overlay removal a moment to settle.
    await page.waitForTimeout(600);

    const buffer = await page.screenshot({ type: "png" });
    const title = (await page.title().catch(() => "")) ?? "";

    return {
      base64: buffer.toString("base64"),
      finalUrl: page.url(),
      title,
    };
  } catch (err) {
    if (err instanceof ScreenshotError) throw err;
    const message =
      err instanceof Error && /timeout/i.test(err.message)
        ? "페이지 로딩이 30초를 초과했습니다"
        : "페이지를 캡처하지 못했습니다";
    throw new ScreenshotError(message);
  } finally {
    await context.close();
  }
}
