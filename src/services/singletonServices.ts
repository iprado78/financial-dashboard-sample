import { SymbolsService } from "@/services/symbols/SymbolsService";
import { TradesService } from "@/services/trades/TradesService";

export const tradesService = new TradesService();

export const symbolsService = new SymbolsService(tradesService);
