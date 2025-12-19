import { symbolsService } from "@/services/singletonServices";

export class ShutdownTasks {
  static async run() {
    this.cleanupSymbolsService();
  }

  private static cleanupSymbolsService() {
    symbolsService.cleanup();
  }
}
