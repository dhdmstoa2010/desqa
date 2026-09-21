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
  /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./,
];

function isPrivateAddress(addr: string): boolean {
  if (isIP(addr) === 6) {
    const v6 = addr.toLowerCase();
    return (
      v6 === "::1" ||
      v6 === "::" ||
      v6.startsWith("fe80:") ||
      v6.startsWith("fc") ||
      v6.startsWith("fd") ||
      v6.startsWith("::ffff:")
    );
  }
  return PRIVATE_V4.some((re) => re.test(addr));
}

// 공개 URL 검증
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

  // 내부망 주소 차단
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
  // PNG base64
  base64: string;
  // 최종 URL
  finalUrl: string;
  // 페이지 제목
  title: string;
};

// 쿠키·팝업 셀렉터
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

// 팝업 닫기
async function dismissOverlays(page: Page): Promise<void> {
  try {
    // ESC 로 닫기
    await page.keyboard.press("Escape").catch(() => {});
    await page.keyboard.press("Escape").catch(() => {});

    await page.evaluate((selectors: string[]) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 알려진 팝업 제거
      for (const sel of selectors) {
        document.querySelectorAll(sel).forEach((el) => el.remove());
      }

      // 전체 화면 오버레이 제거
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

      // 스크롤 잠금 해제
      for (const node of [document.documentElement, document.body]) {
        node.style.overflow = "";
        node.style.position = "";
        node.style.paddingRight = "";
      }
    }, OVERLAY_SELECTORS);
  } catch {
    // 실패해도 캡처는 진행
  }
}

let browserPromise: Promise<Browser> | null = null;

async function launchWithRetry(): Promise<Browser> {
  // 재시도 간격
  const delaysMs = [500, 1500, 3000];
  let lastErr: unknown;
  for (let attempt = 0; attempt <= delaysMs.length; attempt++) {
    try {
      return await chromium.launch({ headless: true });
    } catch (err) {
      lastErr = err;
      if (attempt < delaysMs.length) {
        await new Promise((r) => setTimeout(r, delaysMs[attempt]));
      }
    }
  }
  throw lastErr;
}

async function getBrowser(): Promise<Browser> {
  const current = browserPromise;
  if (current) {
    const browser = await current;
    // 끊긴 브라우저 재실행
    if (browser.isConnected()) return browser;
    // 중복 실행 방지
    if (browserPromise === current) browserPromise = null;
  }

  if (!browserPromise) {
    browserPromise = launchWithRetry().catch((err) => {
      browserPromise = null;
      throw err;
    });
  }
  return browserPromise;
}

// 스크린샷 캡처
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
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });

    if (response && response.status() >= 400) {
      throw new ScreenshotError(
        `페이지를 불러오지 못했습니다 (HTTP ${response.status()})`,
      );
    }

    await page.waitForLoadState("load", { timeout: 10_000 }).catch(() => {});
    await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});

    // 팝업 닫기
    await dismissOverlays(page);

    // 렌더링 안정화 대기
    await page.waitForTimeout(600);

    const buffer = await page.screenshot({ type: "png", animations: "disabled" });
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
