import { getFallbackLogoUrl, getCompanyLogoUrl } from "@/data/companyLogos";
import { SYMBOLS_UNIVERSE } from "@/data/symbolsUniverse";
import { TradesService } from "@/services/trades/TradesService";
import { Listener, ObservableValue, Subscribe } from "@/utils/ObservableValue";

const LOGO_CACHE_KEY = 'company-logo-cache';

export class SymbolsService {
  #cleanUpFunctions: ReturnType<Subscribe<string[]>>[] = [];
  #symbols$ = new ObservableValue<string[]>([]);
  #tradesService: TradesService;
  #logoCache: Map<string, string> = new Map();
  #loadingLogos: Set<string> = new Set();

  constructor(tradesService: TradesService) {
    this.#tradesService = tradesService;
    this.#loadCacheFromStorage();
  }

  loadSnapshot = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const symbols = SYMBOLS_UNIVERSE.map(s => s.ticker);
    this.#symbols$.next(symbols);

    // Prefetch logos for all symbols
    symbols.forEach((symbol) => {
      if (!this.#logoCache.has(symbol) && !this.#loadingLogos.has(symbol)) {
        this.#fetchLogo(symbol);
      }
    });
  };

  init() {
    const func = this.#tradesService.subscribeToTrades((trades) => {
      const symbols = Array.from(new Set(trades.map((trade) => trade.ticker)));
      this.#symbols$.next(symbols);

      // Prefetch logos for all symbols
      symbols.forEach((symbol) => {
        if (!this.#logoCache.has(symbol) && !this.#loadingLogos.has(symbol)) {
          this.#fetchLogo(symbol);
        }
      });
    });
    this.#cleanUpFunctions.push(func);
  }

  cleanup() {
    this.#cleanUpFunctions.forEach((func) => func());
  }

  getSymbols = () => {
    return this.#symbols$.getValue();
  };

  subscribeToSymbols = (listener: Listener<string[]>): (() => void) => {
    return this.#symbols$.subscribe(listener);
  };

  /**
   * Get the logo URL for a symbol (synchronous)
   * Returns cached URL if available, otherwise returns the Clearbit URL
   * The actual image may still need to be fetched by the browser
   */
  getLogoUrl = (symbol: string, size: number = 64): string => {
    const cacheKey = `${symbol}-${size}`;
    const cached = this.#logoCache.get(cacheKey);

    if (cached) {
      return cached;
    }

    // Return the primary URL, will be cached once loaded
    return getCompanyLogoUrl(symbol, size);
  };

  /**
   * Cache a logo URL for a symbol
   */
  cacheLogoUrl = (symbol: string, url: string, size: number = 64): void => {
    const cacheKey = `${symbol}-${size}`;
    this.#logoCache.set(cacheKey, url);
    this.#persistCache();
  };

  /**
   * Get fallback logo URL if primary fails
   */
  getFallbackUrl = (symbol: string, size: number = 64): string => {
    return getFallbackLogoUrl(symbol, size);
  };

  /**
   * Load logo cache from localStorage
   */
  #loadCacheFromStorage = (): void => {
    try {
      const stored = localStorage.getItem(LOGO_CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([key, value]) => {
          this.#logoCache.set(key, value as string);
        });
      }
    } catch (e) {
      // Ignore localStorage errors
      console.warn('Failed to load logo cache from localStorage', e);
    }
  };

  /**
   * Persist logo cache to localStorage
   */
  #persistCache = (): void => {
    try {
      const cacheObj = Object.fromEntries(this.#logoCache.entries());
      localStorage.setItem(LOGO_CACHE_KEY, JSON.stringify(cacheObj));
    } catch (e) {
      // Ignore localStorage errors
      console.warn('Failed to persist logo cache to localStorage', e);
    }
  };

  /**
   * Prefetch a logo by loading it in memory
   */
  #fetchLogo = (symbol: string, size: number = 64): void => {
    const cacheKey = `${symbol}-${size}`;
    if (this.#loadingLogos.has(cacheKey)) {
      return;
    }

    this.#loadingLogos.add(cacheKey);
    const img = new Image();
    const url = getCompanyLogoUrl(symbol, size);

    img.onload = () => {
      this.#logoCache.set(cacheKey, url);
      this.#persistCache();
      this.#loadingLogos.delete(cacheKey);
    };

    img.onerror = () => {
      // Try fallback
      const fallbackUrl = getFallbackLogoUrl(symbol, size);
      const fallbackImg = new Image();

      fallbackImg.onload = () => {
        this.#logoCache.set(cacheKey, fallbackUrl);
        this.#persistCache();
        this.#loadingLogos.delete(cacheKey);
      };

      fallbackImg.onerror = () => {
        // Cache the fallback URL anyway
        this.#logoCache.set(cacheKey, fallbackUrl);
        this.#persistCache();
        this.#loadingLogos.delete(cacheKey);
      };

      fallbackImg.src = fallbackUrl;
    };

    img.src = url;
  };
}
