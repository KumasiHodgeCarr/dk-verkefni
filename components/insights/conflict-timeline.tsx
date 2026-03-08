"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

// Define the chart configuration
const chartConfig = {
  count: {
    label: "Interventions",
    color: "hsl(var(--primary))", // Uses your theme's primary color!
  },
} satisfies ChartConfig;

export function ConflictTimelie() {
  const data = [...INSIGHTS.escalationTrends.data];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Interventions by Decade</CardTitle>
        <CardDescription>
          US military actions per decade since 1945
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="decade"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs fill-muted-foreground"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#fillCount)"
              stroke="var(--color-count)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="">
        <div className="">
          <TrendingUp className="h-4 w-4" />
          {getTrendText(data)}
        </div>
        <div className="">
          Based on Reddit discussions from r/MapPorn and r/coolguides
        </div>
      </CardFooter>
    </Card>
  );
}

{
  /* generate trending texttt */
}

function getTrendText(data: { decade: string; count: number }[]) {
  if (!data || data.length < 2) return "Loading...";

  const first = data[0].count;
  const last = data[data.length - 1].count;
  const change = last - first;

  if (change > 0) return `+${change} interventions since ${data[0].decade}`;
  if (change < 0) return `${change} interventions since ${data[0].decade}`;
  return "Steady over time";
}
