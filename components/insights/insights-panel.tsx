// switching and type animation

"use client";

import { useState, useEffect } from "react";
import { INSIGHTS, type InsightKey } from "@/lib/mock-insights";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TABS: { key: InsightKey; label: string }[] = [
  { key: "persistentConflicts", label: "Persistent Conflicts" },
  { key: "presidentialPatterns", label: "By President" },
  { key: "regionalHotspots", label: "By Region" },
  { key: "escalationTrends", label: "Trends" },
];

export function InsightPanel() {
  const [activeTab, setActiveTab] = useState<InsightKey>("persistentConflicts");
  const [displayedText, setDisplayedText] = useState("");

  const fullText = INSIGHTS[activeTab].text;

  /* Typing animation */
  useEffect(() => {
    setDisplayedText(""); // reset on tab change
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval); // cleanup on unmount/tab change
  }, [activeTab, fullText]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as InsightKey)}
        >
          <TabsList className="mb-4 w-full h-auto flex-wrap gap-y-1">
            {TABS.map(({ key, label }) => (
              <TabsTrigger key={key} value={key} className="">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Type Text */}
          <p className="text-sm leading-relaxed min-h-20">
            {displayedText}
            <span>|</span>
          </p>
        </Tabs>
      </CardContent>
    </Card>
  );
}
