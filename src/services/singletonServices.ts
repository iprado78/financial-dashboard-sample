import { SymbolsService } from "@/services/symbols/SymbolsService";
import { TradesService } from "@/services/trades/TradesService";
import { HoldingsService } from "@/services/holdings/HoldingsService";
import { TransactionsService } from "@/services/transactions/TransactionsService";
import { CreditService } from "@/services/credit/CreditService";
import { RiskService } from "@/services/risk/RiskService";

export const tradesService = new TradesService();

export const holdingsService = new HoldingsService();

export const transactionsService = new TransactionsService();

export const creditService = new CreditService();

export const riskService = new RiskService();

export const symbolsService = new SymbolsService(tradesService);
