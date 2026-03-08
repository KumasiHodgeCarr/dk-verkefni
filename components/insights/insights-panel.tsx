// switching and type animation

"use client";

import { useState, useEffect } from "react";
import { INSIGHTS, type InsightKey } from "@/lib/mock-insights";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TABS: { key: InsightKey; label: string }[] = [
  { key: "persistentConflicts", label: "Persistent Conflicts" },
  { key: "presidentialPatterns", label: "By President" },
  { key: "regionalHotspots", label: "By Region" },
  { key: "escalationTrends", label: "Trends" },
];

export function InsightPaner() {
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
    <div>
      {/* Tab buttons */}
      <div>
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)} className="">
            {label}
          </button>
        ))}
      </div>

      {/* Type Text */}
      <p>
        {displayedText}
        <span>|</span>
      </p>
    </div>
  );
}
