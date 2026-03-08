// hjálpar fall fyrir liti og staðsetningar

import { type ChartConfig } from "@/components/ui/chart";
import { INSIGHTS } from "@/lib/mock-insights";

export const BRAND_COLORS = {
  blue:   "var(--color-brand-blue)",
  red:    "var(--color-brand-red)",
  amber:  "var(--color-brand-amber)",
  green:  "var(--color-brand-green)",
  purple: "var(--color-brand-purple)",
  pink:   "var(--color-brand-pink)",
} as const;

// Persistent = continuous presence across multiple presidents (red)
export const PERSISTENT_COUNTRIES: Record<string, string> = {
  Iraq:        "IQ",
  Afghanistan: "AF",
  Syria:       "SY",
  Yemen:       "YE",
  Somalia:     "SO",
  Libya:       "LY",
  Pakistan:    "PK",
};

// Other intervention countries grouped by region — color matches REGION_CHART_CONFIG
export const OTHER_COUNTRIES: Record<string, { id: string; color: string }> = {
  // Middle East
  Jordan:    { id: "JO", color: BRAND_COLORS.amber },
  Lebanon:   { id: "LB", color: BRAND_COLORS.amber },
  // Africa
  Sudan:     { id: "SD", color: BRAND_COLORS.green },
  Mali:      { id: "ML", color: BRAND_COLORS.green },
  Niger:     { id: "NE", color: BRAND_COLORS.green },
  // Asia
  Vietnam:   { id: "VN", color: BRAND_COLORS.red },
  Cambodia:  { id: "KH", color: BRAND_COLORS.red },
  Laos:      { id: "LA", color: BRAND_COLORS.red },
  // Latin America
  Panama:    { id: "PA", color: BRAND_COLORS.pink },
  Grenada:   { id: "GD", color: BRAND_COLORS.pink },
  Nicaragua: { id: "NI", color: BRAND_COLORS.pink },
  Guatemala: { id: "GT", color: BRAND_COLORS.pink },
  // Europe
  Serbia:    { id: "RS", color: BRAND_COLORS.purple },
};

// One color per region — design decision, single place to change
const REGION_COLORS: Record<string, string> = {
  "Middle East":   BRAND_COLORS.amber,
  "Asia":          BRAND_COLORS.red,
  "Africa":        BRAND_COLORS.green,
  "Europe":        BRAND_COLORS.purple,
  "Latin America": BRAND_COLORS.pink,
  "Americas":      BRAND_COLORS.blue,
};

// Derived from INSIGHTS data — no hardcoded region keys
export const REGION_CHART_CONFIG: ChartConfig = {
  count: { label: "Interventions", color: "transparent" },
  ...Object.fromEntries(
    INSIGHTS.regionalHotspots.data.map(({ region }) => [
      region,
      { label: region, color: REGION_COLORS[region] ?? BRAND_COLORS.blue },
    ]),
  ),
};

export const regionColorMap: Record<string, string> = Object.fromEntries(
  INSIGHTS.regionalHotspots.data.map(({ region }) => [
    region,
    REGION_COLORS[region] ?? BRAND_COLORS.blue,
  ]),
);
