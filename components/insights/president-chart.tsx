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
import { useScrollAnimation } from "@/components/hooks/use-scroll-animation";

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
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "0px 0px -150px 0px" });
  const data = [...INSIGHTS.presidentialPatterns.data];

  // Find min/max for trend text

  const maxPresident = data.reduce((max, item) =>
    item.countries > max.countries ? item : max,
  );

  const minPresident = data.reduce((min, item) =>
    item.countries < min.countries ? item : min,
  );

  return (
    <div
      ref={ref}
      className="transition-all duration-700 will-change-transform h-full"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
    >
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Countries Targeted by President
        </CardTitle>
        <CardDescription>
          Number of countries with US military actions per administration
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <ChartContainer config={chartConfig} className="w-full h-50">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid horizontal={false} className="stroke-muted/30" />

            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs fill-muted-foreground"
            />

            <YAxis
              type="category"
              dataKey="president"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-sm fill-foreground font-medium"
              width={60}
            />

            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, name) => (
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: chartConfig.countries.color,
                        }}
                      />
                      <span className="text-muted-foreground">{name}:</span>
                      <span className="font-semibold tabular-nums">
                        {value} {value === 1 ? "country" : "countries"}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Bar
              dataKey="countries"
              fill="var(--color-countries)"
              radius={[0, 4, 4, 0]}
              barSize={24}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 border-t pt-4 text-sm mt-auto">
        <div className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-4 w-4 text-destructive" />
          <span>
            <span className="font-medium">{maxPresident.president}</span>{" "}
            targeted the most countries ({maxPresident.countries})
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <TrendingDown className="h-4 w-4 text-primary" />
          <span>
            <span className="font-medium">{minPresident.president}</span>{" "}
            targeted the fewest ({minPresident.countries})
          </span>
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Based on Reddit discussions about 21st century interventions
        </p>
      </CardFooter>
    </Card>
    </div>
  );
}
