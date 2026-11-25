import Image, { type ImageProps } from "next/image";

type MediaImageProps = Omit<ImageProps, "loading" | "priority"> & {
  /** Above-the-fold / LCP only - skips lazy loading. */
  eager?: boolean;
};

/**
 * Site media default: lazy + modest quality.
 * Pass eager for hero / header LCP images only.
 */
export function MediaImage({ eager = false, quality = 72, alt = "", ...props }: MediaImageProps) {
  if (eager) {
    return <Image {...props} alt={alt} quality={quality} priority loading="eager" />;
  }

  return <Image {...props} alt={alt} quality={quality} loading="lazy" decoding="async" />;
}
