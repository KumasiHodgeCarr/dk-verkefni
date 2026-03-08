import { ConflictTimeline } from "@/components/insights/conflict-timeline";
import { InsightPanel } from "@/components/insights/insights-panel";
import { PresidentChart } from "@/components/insights/president-chart";
import { RegionalBreakdown } from "@/components/insights/region-breakdown";

export default function InnsynPage() {
  return (
    <main>
      <h1>AI Insitght</h1>

      <InsightPanel />
      <ConflictTimeline />
      <PresidentChart />
      <RegionalBreakdown />
    </main>
  );
}
