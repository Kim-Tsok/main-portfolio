"use client";

import Image, { type ImageLoader } from "next/image";

// Screenshots live on Cloudinary, so let it resize and pick the format.
const cloudinary: ImageLoader = ({ src, width, quality }) =>
  src.replace("/upload/", `/upload/f_auto,q_${quality ?? "auto"},w_${width}/`);

export default function ProjectImage({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      loader={src.includes("res.cloudinary.com") ? cloudinary : undefined}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
