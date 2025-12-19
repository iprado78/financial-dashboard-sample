import * as SingletonServices from "@/services/singletonServices";

export class StartupTasks {
  static async run() {
    this.logServices();
    await StartupTasks.loadTrades();
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

  private static initializeSymbols() {
    SingletonServices.symbolsService.init();
  }
}
