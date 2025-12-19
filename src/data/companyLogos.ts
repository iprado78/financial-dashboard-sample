// Mapping of ticker symbols to company domains for logo fetching
export const TICKER_TO_DOMAIN: Record<string, string> = {
  AAPL: 'apple.com',
  ABT: 'abbott.com',
  ADBE: 'adobe.com',
  ALGN: 'aligntech.com',
  ALXN: 'alexion.com',
  AMAT: 'appliedmaterials.com',
  AMD: 'amd.com',
  AMGN: 'amgen.com',
  AMZN: 'amazon.com',
  ANSS: 'ansys.com',
  ATVI: 'activisionblizzard.com',
  AVGO: 'broadcom.com',
  BIIB: 'biogen.com',
  BKNG: 'booking.com',
  BMRN: 'biomarin.com',
  CDNS: 'cadence.com',
  CERN: 'cerner.com',
  CHTR: 'spectrum.com',
  CMCSA: 'comcast.com',
  COST: 'costco.com',
  CPRT: 'copart.com',
  CRM: 'salesforce.com',
  CSCO: 'cisco.com',
  CSX: 'csx.com',
  CTAS: 'cintas.com',
  CTSH: 'cognizant.com',
  DISH: 'dish.com',
  DLTR: 'dollartree.com',
  DOCU: 'docusign.com',
  DXCM: 'dexcom.com',
  EA: 'ea.com',
  EXAS: 'exactsciences.com',
  FAST: 'fastenal.com',
  FISV: 'fiserv.com',
  FOX: 'foxcorporation.com',
  FOXA: 'foxcorporation.com',
  GILD: 'gilead.com',
  GOOGL: 'google.com',
  HSIC: 'henryschein.com',
  IBM: 'ibm.com',
  IDXX: 'idexx.com',
  ILMN: 'illumina.com',
  INCR: 'intercept.com',
  INCY: 'incyte.com',
  INTC: 'intel.com',
  INTU: 'intuit.com',
  ISRG: 'intuitive.com',
  JNJ: 'jnj.com',
  KHC: 'kraftheinzcompany.com',
  KLAC: 'kla.com',
  KO: 'coca-cola.com',
  LBTYA: 'libertyglobal.com',
  LRCX: 'lamresearch.com',
  LULU: 'lululemon.com',
  MAR: 'marriott.com',
  MCHP: 'microchip.com',
  MDLZ: 'mondelezinternational.com',
  MELI: 'mercadolibre.com',
  META: 'meta.com',
  MLCO: 'melcoresorts.com',
  MNST: 'monsterenergy.com',
  MRK: 'merck.com',
  MRNA: 'modernatx.com',
  MSFT: 'microsoft.com',
  MU: 'micron.com',
  NDAQ: 'nasdaq.com',
  NFLX: 'netflix.com',
  NTES: 'netease.com',
  NVDA: 'nvidia.com',
  OKTA: 'okta.com',
  ORCL: 'oracle.com',
  ORLY: 'oreillyauto.com',
  PAYX: 'paychex.com',
  PCAR: 'paccar.com',
  PEP: 'pepsico.com',
  PFE: 'pfizer.com',
  PYPL: 'paypal.com',
  QCOM: 'qualcomm.com',
  REGN: 'regeneron.com',
  SBUX: 'starbucks.com',
  SGEN: 'seagen.com',
  SIRI: 'siriusxm.com',
  SNPS: 'synopsys.com',
  SPLK: 'splunk.com',
  SWKS: 'skyworksinc.com',
  TMUS: 't-mobile.com',
  TSLA: 'tesla.com',
  TTWO: 'take2games.com',
  TXN: 'ti.com',
  ULTA: 'ulta.com',
  VRSK: 'verisk.com',
  VRSN: 'verisign.com',
  VRTX: 'vrtx.com',
  WBA: 'walgreens.com',
  WDAY: 'workday.com',
  WDC: 'westerndigital.com',
  WMT: 'walmart.com',
  XLNX: 'xilinx.com',
  XRAY: 'dentsply.com',
  ZM: 'zoom.us',
};

/**
 * Get the logo URL for a given ticker symbol
 * Uses Clearbit Logo API with fallback to Google S2 favicons
 */
export function getCompanyLogoUrl(ticker: string, size: number = 64): string {
  const domain = TICKER_TO_DOMAIN[ticker.toUpperCase()];
  if (!domain) {
    // Fallback to a placeholder or generic icon
    return `https://ui-avatars.com/api/?name=${ticker}&size=${size}&background=random`;
  }

  // Primary: Clearbit (clean, vectorized logos, no auth needed)
  return `https://logo.clearbit.com/${domain}`;
}

/**
 * Get a fallback logo URL if the primary fails
 */
export function getFallbackLogoUrl(ticker: string, size: number = 64): string {
  const domain = TICKER_TO_DOMAIN[ticker.toUpperCase()];
  if (!domain) {
    return `https://ui-avatars.com/api/?name=${ticker}&size=${size}&background=random`;
  }

  // Fallback: Google S2 favicons
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}
