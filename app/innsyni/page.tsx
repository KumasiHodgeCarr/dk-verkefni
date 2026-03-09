import { Suspense } from "react";
import { ConflictTimeline } from "@/components/insights/conflict-timeline";
import { InsightPanel } from "@/components/insights/insights-panel";
import { PresidentChart } from "@/components/insights/president-chart";
import { RegionalBreakdown } from "@/components/insights/region-breakdown";
import { WorldMap } from "@/components/insights/world-map";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  InnsyniPageSkeleton,
  WorldMapSkeleton,
  ChartsGridSkeleton,
} from "@/components/ui/skeletons";

export default function InnsynPage() {
  return (
    <div className="space-y-12 py-8 overflow-x-clip">
      {/* Insight panel + timeline */}
      <section>
        <div className="container mx-auto max-w-4xl px-4 space-y-6">
          <Suspense fallback={<InnsyniPageSkeleton />}>
            <InsightPanel />
            <ConflictTimeline />
          </Suspense>
        </div>
      </section>

      {/* World map */}
      <section>
        <div className="w-full px-4 md:px-6">
          <Suspense fallback={<WorldMapSkeleton />}>
            <ScrollReveal animation="blur" threshold={0.2} delay={880}>
              <WorldMap />
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* Charts grid */}
      <section className="overflow-x-clip">
        <div className="container mx-auto max-w-4xl px-4">
          <Suspense fallback={<ChartsGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grid-rows-[600px]">
              <ScrollReveal animation="fade-right" threshold={0.4} delay={200} className="h-full">
                <PresidentChart />
              </ScrollReveal>
              <ScrollReveal animation="fade-left" threshold={0.4} delay={400} className="h-full">
                <RegionalBreakdown />
              </ScrollReveal>
            </div>
          </Suspense>
        </div>
      </section>
    </div>
  );
}
