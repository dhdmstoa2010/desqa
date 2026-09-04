import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { chromium, type Browser } from "playwright";

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

    // Give late CSS / web fonts a moment to settle.
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
