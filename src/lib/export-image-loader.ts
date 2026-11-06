"use client";

const BASE_PATH = "/homespot";

export default function exportImageLoader({ src }: { src: string }) {
  if (src.startsWith(`${BASE_PATH}/`) || src.startsWith("http")) return src;
  if (src.startsWith("/")) return `${BASE_PATH}${src}`;
  return src;
}
