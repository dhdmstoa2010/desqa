export function domainOf(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
}

export function relTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const m = 60_000;
  const h = 60 * m;
  const d = 24 * h;
  if (diff < h) return `${Math.max(1, Math.round(diff / m))}분 전`;
  if (diff < d) return `${Math.round(diff / h)}시간 전`;
  if (diff < 7 * d) return `${Math.round(diff / d)}일 전`;
  return new Date(iso)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.$/, "");
}
