import { useState, useEffect } from "react";
import { LOGO_MAP, hasLogo } from "./logoMap";
import fallbackIconLight from "./nyse-fallback-light.svg";
import fallbackIconDark from "./nyse-fallback-dark.svg";
import { ROUNDED_SMALL_CLASS } from "@/styles/designSystem";

const LOGO_LIGHT_MODE_CLASS = "dark:hidden";

const LOGO_DARK_MODE_CLASS = "hidden dark:block";

interface CompanyLogoProps {
  ticker: string;
  size?: number;
  className?: string;
}

interface LogoImageProps {
  src: string;
  alt: string;
  size: number;
  isFallback: boolean;
  isDarkMode: boolean;
  className: string;
}

const LogoImage = ({
  src,
  alt,
  size,
  isFallback,
  isDarkMode,
  className,
}: LogoImageProps) => {
  const roundedClass = isFallback ? "" : ROUNDED_SMALL_CLASS;
  const modeClass = isDarkMode ? LOGO_DARK_MODE_CLASS : LOGO_LIGHT_MODE_CLASS;
  const combinedClassName = `${roundedClass} ${modeClass} ${className}`;

  return (
    <img
      src={src}
      alt={alt}
      className={combinedClassName}
      style={{ width: size, height: size }}
    />
  );
};

export default function CompanyLogo({
  ticker,
  size = 32,
  className = "",
}: CompanyLogoProps) {
  const [imgSrc, setImgSrc] = useState<string>(fallbackIconLight);
  const [isFallback, setIsFallback] = useState<boolean>(true);

  useEffect(() => {
    const upperTicker = ticker.toUpperCase();

    if (hasLogo(upperTicker)) {
      LOGO_MAP[upperTicker]()
        .then((module) => {
          setImgSrc(module.default);
          setIsFallback(false);
        })
        .catch(() => {
          setImgSrc(fallbackIconLight);
          setIsFallback(true);
        });
    } else {
      setImgSrc(fallbackIconLight);
      setIsFallback(true);
    }
  }, [ticker]);

  const logoAlt = `${ticker} logo`;
  const darkSrc = isFallback ? fallbackIconDark : imgSrc;

  return (
    <>
      <LogoImage
        src={imgSrc}
        alt={logoAlt}
        size={size}
        isFallback={isFallback}
        isDarkMode={false}
        className={className}
      />
      <LogoImage
        src={darkSrc}
        alt={logoAlt}
        size={size}
        isFallback={isFallback}
        isDarkMode={true}
        className={className}
      />
    </>
  );
}
