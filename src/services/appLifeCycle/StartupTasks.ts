import * as SingletonServices from "@/services/singletonServices";

export class StartupTasks {
  static async run() {
    this.logServices();
    await Promise.all([
      StartupTasks.loadTrades(),
      StartupTasks.loadHoldings(),
      StartupTasks.loadTransactions(),
      StartupTasks.loadCredit(),
      StartupTasks.loadRisk(),
      StartupTasks.loadSymbols(),
    ]);
    StartupTasks.initializeSymbols();
  }

  private static logServices() {
    console.log("Logging services...");
    for (const [name] of Object.entries(SingletonServices)) {
      console.log(`Service: ${name} loaded`);
    }
  }

  private static async loadTrades() {
    await SingletonServices.tradesService.loadSnapshot();
  }

  private static async loadHoldings() {
    await SingletonServices.holdingsService.loadSnapshot();
  }

  private static async loadTransactions() {
    await SingletonServices.transactionsService.loadSnapshot();
  }

  private static async loadCredit() {
    await SingletonServices.creditService.loadSnapshot();
  }

  private static async loadRisk() {
    await SingletonServices.riskService.loadSnapshot();
  }

  private static async loadSymbols() {
    await SingletonServices.symbolsService.loadSnapshot();
  }

  private static initializeSymbols() {
    SingletonServices.symbolsService.init();
  }
}
