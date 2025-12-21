import { useState, useEffect } from "react";
import { LOGO_MAP, hasLogo } from "./logoMap";
import fallbackIconLight from "./nyse-fallback-light.svg";
import fallbackIconDark from "./nyse-fallback-dark.svg";

interface CompanyLogoProps {
  ticker: string;
  size?: number;
  className?: string;
}

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

  return (
    <>
      <img
        src={imgSrc}
        alt={`${ticker} logo`}
        className={`${isFallback ? "" : "rounded"} dark:hidden ${className}`}
        style={{ width: size, height: size }}
      />
      <img
        src={isFallback ? fallbackIconDark : imgSrc}
        alt={`${ticker} logo`}
        className={`${
          isFallback ? "" : "rounded"
        } hidden dark:block ${className}`}
        style={{ width: size, height: size }}
      />
    </>
  );
}
