import { useState, ImgHTMLAttributes } from "react";
import fallbackLogo from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.48 (3).jpeg";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt = "Cafetería El Molino",
  fallbackSrc,
  className = "",
  onError,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc || fallbackLogo);
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc || fallbackLogo);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={imgSrc || fallbackLogo}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
