"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { INSIGHTS } from "@/lib/mock-insights";

// Define  chart config using brand colors yeahhh!
const chartConfig = {
  middleEast: {
    label: "Middle East",
    color: "var(--color-brand-amber)",
  },
  asia: {
    label: "Asia",
    color: "var(--color-brand-red)",
  },
  africa: {
    label: "Africa",
    color: "var(--color-brand-green)",
  },
  europe: {
    label: "Europe",
    color: "var(--color-brand-purple)",
  },
  americas: {
    label: "Americas",
    color: "var(--color-brand-blue)",
  },
} satisfies ChartConfig;

export function RegionalBreakdown() {
  const data = [...INSIGHTS.regionalHotspots.data];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Interventions by Region
          <CardDescription>
            Geographic distribution of US military actions
          </CardDescription>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
