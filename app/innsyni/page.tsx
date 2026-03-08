import { ConflictTimelie } from "@/components/insights/conflict-timeline";
import { InsightPanel } from "@/components/insights/insights-panel";
import { PresidentChart } from "@/components/insights/president-chart";

export default function InnsynPage() {
  return (
    <main>
      <h1>AI Insitght</h1>

      <InsightPanel />
      <ConflictTimelie />
      <PresidentChart />
    </main>
  );
}
