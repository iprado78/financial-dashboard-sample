import { IRisk, RISK_TYPES } from "@/services/risk/RiskService";

export function generateRisk(): IRisk[] {
  const risks: IRisk[] = [];
  const numRisks = Math.floor(Math.random() * 21) + 30; // 30-50 risk entries

  for (let i = 1; i <= numRisks; i++) {
    const VaR = Math.round((Math.random() * 200000 + 10000) * 100) / 100;
    const expectedShortfall =
      Math.round(VaR * (Math.random() * 0.5 + 1.3) * 100) / 100; // 1.3x to 1.8x VaR
    const volatility = Math.round((Math.random() * 0.3 + 0.05) * 10000) / 10000; // 0.05 to 0.35
    const beta = Math.round((Math.random() * 2 + 0.3) * 100) / 100; // 0.3 to 2.3
    const correlation = Math.round((Math.random() * 1.8 - 0.9) * 100) / 100; // -0.9 to 0.9

    const riskDate = new Date(
      Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    ).toISOString();

    risks.push({
      id: `RISK-${String(i).padStart(3, "0")}`,
      portfolioId: `PORT-${String(Math.floor(Math.random() * 50) + 1).padStart(
        3,
        "0"
      )}`,
      riskType: RISK_TYPES[Math.floor(Math.random() * RISK_TYPES.length)],
      VaR,
      expectedShortfall,
      volatility,
      beta,
      correlation,
      riskDate,
    });
  }

  return risks.sort(
    (a, b) => new Date(b.riskDate).getTime() - new Date(a.riskDate).getTime()
  );
}
