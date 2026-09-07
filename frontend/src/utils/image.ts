/** 업로드한 이미지를 캔버스로 축소·압축해 data URL 로 변환한다.
 *  게시물 이미지는 백엔드 없이 localStorage(zustand persist)에 들어가므로
 *  긴 변을 maxDim 으로 제한하고 JPEG 로 다시 인코딩해 용량을 줄인다. */
export async function fileToCompressedDataUrl(
  file: File,
  maxDim = 1400,
  quality = 0.82,
): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 올릴 수 있어요.");
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("파일을 읽지 못했어요."));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("이미지를 불러오지 못했어요."));
    el.src = dataUrl;
  });

  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("이미지를 처리하지 못했어요.");
  ctx.drawImage(img, 0, 0, w, h);

  // PNG 원본이 이미 작으면 그대로, 아니면 JPEG 재인코딩
  const jpeg = canvas.toDataURL("image/jpeg", quality);
  return jpeg.length < dataUrl.length ? jpeg : dataUrl;
}
