"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

// ✅ FIX 1: Fix the chartConfig - it should be for 'count' not 'countries'
const chartConfig = {
  count: {
    // ← Changed from 'countries' to 'count' to match dataKey
    label: "Interventions", // ← Changed label to match
    color: "var(--chart-1)", // ← Changed to --chart-1 (blue) for area chart
  },
} satisfies ChartConfig;

export function ConflictTimeline() {
  // ← FIX 2: Fixed typo in function name (was ConflictTimelie)
  const data = [...INSIGHTS.escalationTrends.data];

  return (
    <Card className="border border-border rounded-xl py-7">
      <CardHeader>
        <CardTitle className="text-sm font-semibold mb-2 uppercase tracking-widest">
          Interventions by Decade
        </CardTitle>
        <CardDescription>
          US military actions per decade since 1945
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-70">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  // ✅ FIX 3: Use the correct CSS variable
                  stopColor="var(--chart-1)" // ← Changed from --color-count
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)" // ← Changed from --color-count
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} className="stroke-border" />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs fill-muted-foreground"
              width={30} // Give it some space
            />

            <XAxis
              dataKey="decade"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs fill-muted-foreground"
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#fillCount)"
              // ✅ FIX 4: Use the correct CSS variable for stroke
              stroke="var(--chart-1)" // ← Changed from --color-count
              strokeWidth={2} // ← Optional: add stroke width for better visibility
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <TrendingUp className="h-4 w-4 text-chart-1" />{" "}
          {/* ✅ FIX 5: Use text-chart-1 for icon */}
          {getTrendText(data)}
        </div>
        <div className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
          Based on Reddit discussions from r/MapPorn and r/coolguides
        </div>
      </CardFooter>
    </Card>
  );
}

// Generate trending text
function getTrendText(data: { decade: string; count: number }[]) {
  if (!data || data.length < 2) return "Loading...";

  const first = data[0].count;
  const last = data[data.length - 1].count;
  const change = last - first;

  if (change > 0) return `+${change} interventions since ${data[0].decade}`;
  if (change < 0) return `${change} interventions since ${data[0].decade}`;
  return "Steady over time";
}
