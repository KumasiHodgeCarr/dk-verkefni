"use client";

import { PieChart, Pie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { INSIGHTS } from "@/lib/mock-insights";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/components/hooks/use-scroll-animation";
import { REGION_CHART_CONFIG, regionColorMap } from "@/lib/brand-colors";

// Sort smallest to biggest outside the component (stable, no re-sort on render)
const allRegions = [...INSIGHTS.regionalHotspots.data].sort(
  (a, b) => a.count - b.count,
);

export function RegionalBreakdown() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "0px 0px -150px 0px" });
  const [revealedCount, setRevealedCount] = useState(1);

  useEffect(() => {
    if (!isVisible) return;
    if (revealedCount >= allRegions.length) return;

    const timer = setTimeout(() => {
      setRevealedCount((n) => n + 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [revealedCount, isVisible]);

  const visibleData = allRegions.slice(0, revealedCount);
  const visibleLabels: string[] = visibleData.map((item) => item.region);

  const renderLabel = (entry: { payload: { region: string }; percent: number }) => {
    if (!visibleLabels.includes(entry.payload.region)) return null;
    return `${entry.payload.region} ${(entry.percent * 100).toFixed(0)}%`;
  };

  return (
    <Card ref={ref} className="border border-border rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-widest">
          Interventions by Region
        </CardTitle>
        <CardDescription>
          Geographic distribution of US military actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={REGION_CHART_CONFIG}
          className="mx-auto aspect-square max-h-70"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={visibleData}
              dataKey="count"
              nameKey="region"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={renderLabel}
              labelLine={false}
            >
              {visibleData.map((entry) => (
                <Cell
                  key={entry.region}
                  fill={regionColorMap[entry.region] ?? "var(--color-muted)"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="mt-4 space-y-2">
          {allRegions.map((entry, index) => (
            <li
              key={entry.region}
              className="flex items-center justify-between text-sm transition-opacity duration-300"
              style={{ opacity: index < revealedCount ? 1 : 0 }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: regionColorMap[entry.region] ?? "#64748b",
                  }}
                />
                {entry.region}
              </span>
              <span className="font-semibold">{entry.count} operations</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
