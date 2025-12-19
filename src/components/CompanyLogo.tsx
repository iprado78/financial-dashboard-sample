import { symbolsService } from '@/services/singletonServices';
import { useState } from 'react';

interface CompanyLogoProps {
  ticker: string;
  size?: number;
  className?: string;
}

export default function CompanyLogo({
  ticker,
  size = 32,
  className = '',
}: CompanyLogoProps) {
  const [imgSrc, setImgSrc] = useState(() => symbolsService.getLogoUrl(ticker, size));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // Try fallback on first error
      setHasError(true);
      const fallbackUrl = symbolsService.getFallbackUrl(ticker, size);
      setImgSrc(fallbackUrl);
      // Cache the fallback URL
      symbolsService.cacheLogoUrl(ticker, fallbackUrl, size);
    }
  };

  const handleLoad = () => {
    // Cache the successful URL
    symbolsService.cacheLogoUrl(ticker, imgSrc, size);
  };

  return (
    <img
      src={imgSrc}
      alt={`${ticker} logo`}
      className={`rounded ${className}`}
      style={{ width: size, height: size }}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
