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

const VIEWPORT = "h-[calc(100dvh-3.5rem)]";

export default function InnsynPage() {
  return (
    <div
      className={`${VIEWPORT} overflow-y-scroll snap-y snap-mandatory scroll-smooth`}
    >
      {/* Viewport 1: heading + insight panel + timeline */}
      <section
        className={`${VIEWPORT} snap-start flex flex-col justify-center`}
      >
        <div className="container mx-auto max-w-4xl px-4 space-y-6">
          <Suspense fallback={<InnsyniPageSkeleton />}>
            <InsightPanel />
            <ConflictTimeline />
          </Suspense>
        </div>
      </section>

      {/* Viewport 2: world map */}
      <section
        className={`${VIEWPORT} snap-start flex flex-col justify-center`}
      >
        <div className="w-full px-6">
          <Suspense fallback={<WorldMapSkeleton />}>
            <ScrollReveal animation="blur" threshold={0.1} delay={520}>
              <WorldMap />
            </ScrollReveal>
          </Suspense>
        </div>
      </section>

      {/* Viewport 3: charts grid */}
      <section
        className={`${VIEWPORT} snap-start flex flex-col justify-center`}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <Suspense fallback={<ChartsGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScrollReveal animation="fade-right" threshold={0.1} delay={200}>
                <PresidentChart />
              </ScrollReveal>
              <ScrollReveal animation="fade-left" threshold={0.1} delay={400}>
                <RegionalBreakdown />
              </ScrollReveal>
            </div>
          </Suspense>
        </div>
      </section>
    </div>
  );
}
