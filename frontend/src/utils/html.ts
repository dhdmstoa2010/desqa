/* 리치 에디터가 만든 HTML 을 다루는 작은 헬퍼들 */
export function stripHtml(html: string): string {
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function firstImageSrc(html: string): string | undefined {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m?.[1];
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** 본문을 detail 페이지에 넣을 HTML 로. 예전 게시물(순수 텍스트)은 <p> 로 감싼다. */
export function bodyToHtml(body: string): string {
  return /<\w+[\s>]/.test(body)
    ? body
    : body
        .split(/\n{2,}/)
        .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
        .join("");
}
