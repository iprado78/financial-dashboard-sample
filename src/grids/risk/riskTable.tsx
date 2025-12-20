import Table from "@/components/Table/Table";
import { RISK_COLUMN_DEFS } from "@/grids/risk/riskColumnDefs";
import { riskService } from "@/services/singletonServices";
import { useSyncExternalStore } from "react";

export const RiskTable = () => {
  const risks = useSyncExternalStore(
    riskService.subscribeToRisks,
    riskService.getRisks,
    riskService.getRisks
  );
  return <Table rowIdField={"id"} data={risks} columnDefs={RISK_COLUMN_DEFS} />;
};
