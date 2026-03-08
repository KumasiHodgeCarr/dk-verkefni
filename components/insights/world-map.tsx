"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { BRAND_COLORS, PERSISTENT_COUNTRIES, OTHER_COUNTRIES } from "@/lib/brand-colors";

const ID_TO_NAME: Record<string, string> = {
  ...Object.fromEntries(Object.entries(PERSISTENT_COUNTRIES).map(([name, id]) => [id, name])),
  ...Object.fromEntries(Object.entries(OTHER_COUNTRIES).map(([name, { id }]) => [id, name])),
};

type Tooltip = { name: string; x: number; y: number; isPersistent: boolean } | null;

export function WorldMap() {
  const [svgContent, setSvgContent] = useState<string>("");
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/images/world.svg")
      .then((r) => r.text())
      .then((text) => {
        let modified = text;

        Object.values(PERSISTENT_COUNTRIES).forEach((id) => {
          modified = modified.replace(
            new RegExp(`id="${id}"`, "g"),
            `id="${id}" data-country="${id}" data-persistent="true" style="fill:${BRAND_COLORS.red};opacity:0.9;cursor:pointer"`,
          );
        });

        Object.values(OTHER_COUNTRIES).forEach(({ id, color }) => {
          modified = modified.replace(
            new RegExp(`id="${id}"`, "g"),
            `id="${id}" data-country="${id}" style="fill:${color};opacity:0.55;cursor:pointer"`,
          );
        });

        setSvgContent(modified);
      });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const target = e.target as SVGPathElement;
      const id = target.getAttribute?.("data-country");
      if (!id) {
        setTooltip(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      setTooltip({
        name: ID_TO_NAME[id] ?? id,
        x: e.clientX - rect.left + 12,
        y: e.clientY - rect.top - 28,
        isPersistent: target.getAttribute("data-persistent") === "true",
      });
    };

    const onLeave = () => setTooltip(null);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [svgContent]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-card p-4">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest">Conflict Zones</p>
      <div ref={containerRef} className="relative w-full">
        {svgContent ? (
          <div
            className="w-full [&_svg]:w-full [&_svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="h-48 animate-pulse rounded bg-muted" />
        )}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 flex flex-col items-center gap-1"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.isPersistent && (
              <Star className="h-5 w-5 fill-amber-400 text-amber-400 drop-shadow-lg" />
            )}
            <div className="rounded bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md border border-border">
              {tooltip.name}
            </div>
          </div>
        )}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {[
          { label: "Persistent (⭐)", color: BRAND_COLORS.red, opacity: 1 },
          { label: "Middle East", color: BRAND_COLORS.amber, opacity: 0.55 },
          { label: "Africa", color: BRAND_COLORS.green, opacity: 0.55 },
          { label: "Asia", color: BRAND_COLORS.red, opacity: 0.55 },
          { label: "Latin America", color: BRAND_COLORS.pink, opacity: 0.55 },
          { label: "Europe", color: BRAND_COLORS.purple, opacity: 0.55 },
        ].map(({ label, color, opacity }) => (
          <li key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: color, opacity }}
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
