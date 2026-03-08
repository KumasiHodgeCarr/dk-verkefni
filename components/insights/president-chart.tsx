"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

// Configure colors for each president (optional but nice!)
const chartConfig = {
  countries: {
    label: "Countries Targeted",
    color: "hsl(var(--destructive))", // Red for military actions
  },
  // color-code by party ? :
  bush: { label: "Bush", color: "hsl(var(--destructive))" },
  obama: { label: "Obama", color: "hsl(var(--primary))" },
  trump: { label: "Trump", color: "hsl(var(--destructive))" },
  biden: { label: "Biden", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

export function PresidentChart() {
  const data = [...INSIGHTS.presidentialPatterns.data];

  // Find min/max for trend text

  const maxPresident = data.reduce((max, item) =>
    item.countries > max.countries ? item : max,
  );

  const minPresident = data.reduce((min, item) =>
    item.countries < min.countries ? item : min,
  );

  return (
    <Card>
      <CardFooter>
        <CardHeader>
          <CardTitle>Countries Targeted by President</CardTitle>
          <CardDescription>
            Number of countries with US military actions per administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid horizontal={false} className="stroke-muted" />

              {/* X-Axis (numbers) */}
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs fill-muted-foreground"
              />

              {/* Y-Axis (president names) */}
              <YAxis
                type="category"
                dataKey="president"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-sm fill-foreground font-medium"
                width={70}
              />

              {/* Tooltip with shadcn styling */}
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="w-45"
                    formatter={(value, name, props) => (
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: chartConfig.countries.color,
                          }}
                        />
                        {name}  
                        <span className="font-medium">
                          {value} {value === 1 ? "country" : "countries"}
                        </span>
                      </div>
                    )}
                  />
                }
              />

              {/* The actual bars */}
              <Bar
                dataKey="countries"
                fill="var(--color-countries)"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter>
          <div>
            {maxPresident.president}targeted the most countries (
            {maxPresident.countries})
          </div>
          <TrendingUp />
          <div>
            {minPresident.president} targeted the fewest (
            {minPresident.countries})
          </div>
        </CardFooter>
        <TrendingDown />
        <div>Based on Reddit discussions about 21st century interventions</div>
      </CardFooter>
    </Card>
  );
}
