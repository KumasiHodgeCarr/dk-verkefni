export const INSIGHTS = {
  persistentConflicts: {
    text: "Iraq and Afghanistan appear under every president since 2001. These two countries represent the longest sustained US military presence since Vietnam, spanning Bush, Obama, Trump, and Biden administrations with no sign of full withdrawal.",
    countries: [
      "Iraq",
      "Afghanistan",
      "Syria",
      "Yemen",
      "Somalia",
      "Libya",
      "Pakistan",
    ],
  },
  presidentialPatterns: {
    text: "Bush initiated the most new conflicts post-9/11, launching operations in 12 countries. Obama expanded drone warfare significantly, adding 6 new countries. Trump reduced ground troops but maintained air campaigns. Biden inherited all active theaters.",
    data: [
      { president: "Bush", countries: 12 },
      { president: "Obama", countries: 8 },
      { president: "Trump", countries: 5 },
      { president: "Biden", countries: 4 },
    ],
  },
  regionalHotspots: {
    text: "The Middle East dominates post-9/11 operations, accounting for over 60% of all interventions. Africa has seen a sharp rise since 2010 with expanding drone bases. Asia operations remain focused on Afghanistan and Pakistan.",
    data: [
      { region: "Middle East", count: 15 },
      { region: "Africa", count: 8 },
      { region: "Asia", count: 6 },
      { region: "Latin America", count: 4 },
      { region: "Europe", count: 2 },
    ],
  },
  escalationTrends: {
    text: "The 1950s–70s saw frequent interventions during the Cold War proxy conflicts. Activity dipped in the 1980s–90s before a sharp spike after 2001. The 2010s saw the highest number of simultaneous active operations in US history.",
    data: [
      { decade: "1950s", count: 6 },
      { decade: "1960s", count: 9 },
      { decade: "1970s", count: 5 },
      { decade: "1980s", count: 7 },
      { decade: "1990s", count: 6 },
      { decade: "2000s", count: 14 },
      { decade: "2010s", count: 18 },
      { decade: "2020s", count: 9 },
    ],
  },
} as const;

export type InsightKey = keyof typeof INSIGHTS;
