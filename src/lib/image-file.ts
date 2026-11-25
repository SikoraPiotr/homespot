const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

export type ImageKind = "jpg" | "png" | "webp";

export function detectImageKind(bytes: Uint8Array): ImageKind | null {
  if (bytes.length < 12 || bytes.length > MAX_IMAGE_BYTES) {
    return null;
  }

  // Trust the file header, not the browser-supplied name or Content-Type.
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpg";
  }

  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "png";
  }

  const riff = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
  const webp = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;

  if (riff && webp) {
    return "webp";
  }

  return null;
}

export { MAX_IMAGE_BYTES };
