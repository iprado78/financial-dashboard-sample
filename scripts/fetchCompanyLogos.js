#!/usr/bin/env node

/**
 * Script to fetch company logos and store them locally
 * Uses multiple fallback strategies for reliability
 *
 * Usage: node scripts/fetchCompanyLogos.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ticker to domain mapping from companyLogos.ts
const TICKER_TO_DOMAIN = {
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

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'companyLogos');
const LOGO_MAP_PATH = path.join(__dirname, '..', 'src', 'components', 'CompanyLogo', 'logoMap.ts');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Download a file from URL
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);

    const request = https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(outputPath, () => {});
        downloadFile(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        fs.unlink(outputPath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(outputPath, () => {});
      reject(err);
    });

    request.setTimeout(10000, () => {
      request.destroy();
      file.close();
      fs.unlink(outputPath, () => {});
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Try to fetch logo using multiple sources
 */
async function fetchLogo(ticker, domain) {
  const sources = [
    // Google's favicon service (most reliable, but lower quality)
    {
      name: 'Google Favicon',
      url: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      ext: 'png'
    },
    // Clearbit (high quality, but may be blocked or rate limited)
    {
      name: 'Clearbit',
      url: `https://logo.clearbit.com/${domain}`,
      ext: 'png'
    },
  ];

  for (const source of sources) {
    const outputPath = path.join(OUTPUT_DIR, `${ticker}.${source.ext}`);

    try {
      await downloadFile(source.url, outputPath);
      console.log(`✓ ${ticker} from ${source.name}`);
      return `${ticker}.${source.ext}`;
    } catch (error) {
      // Continue to next source
    }
  }

  console.log(`✗ ${ticker} - all sources failed`);
  return null;
}

/**
 * Fetch logos for all tickers
 */
async function fetchAllLogos() {
  const logoMap = {};
  const tickers = Object.keys(TICKER_TO_DOMAIN);

  console.log(`Fetching logos for ${tickers.length} companies...\n`);

  for (const ticker of tickers) {
    const domain = TICKER_TO_DOMAIN[ticker];
    const filename = await fetchLogo(ticker, domain);

    if (filename) {
      logoMap[ticker] = filename;
    }

    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  return logoMap;
}

/**
 * Generate the logoMap.ts file
 */
function generateLogoMapFile(logoMap) {
  const entries = Object.entries(logoMap)
    .map(([ticker, filename]) => `  '${ticker}': () => import('@/assets/companyLogos/${filename}'),`)
    .join('\n');

  const content = `/**
 * Company logo map
 * Auto-generated by scripts/fetchCompanyLogos.js
 * Maps ticker symbols to their logo file imports
 */

export const LOGO_MAP: Record<string, () => Promise<{ default: string }>> = {
${entries}
};

export const hasLogo = (ticker: string): boolean => {
  return ticker.toUpperCase() in LOGO_MAP;
};
`;

  fs.writeFileSync(LOGO_MAP_PATH, content);
  console.log(`\n✓ Generated logo map at ${LOGO_MAP_PATH}`);
}

/**
 * Main execution
 */
async function main() {
  try {
    const logoMap = await fetchAllLogos();
    generateLogoMapFile(logoMap);

    const successCount = Object.keys(logoMap).length;
    const totalCount = Object.keys(TICKER_TO_DOMAIN).length;

    console.log(`\n✓ Complete! Successfully fetched ${successCount}/${totalCount} logos`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
