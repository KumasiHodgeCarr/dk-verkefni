"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "../hooks/use-scroll-animation";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

const animationStyles: Record<AnimationType, { initial: string; animated: string }> = {
  "fade-up":    { initial: "opacity-0 translate-y-10", animated: "opacity-100 translate-y-0" },
  "fade-down":  { initial: "opacity-0 -translate-y-10", animated: "opacity-100 translate-y-0" },
  "fade-left":  { initial: "opacity-0 translate-x-10", animated: "opacity-100 translate-x-0" },
  "fade-right": { initial: "opacity-0 -translate-x-10", animated: "opacity-100 translate-x-0" },
  scale:        { initial: "opacity-0 scale-95", animated: "opacity-100 scale-100" },
  blur:         { initial: "opacity-0 blur-sm scale-95", animated: "opacity-100 blur-0 scale-100" },
};

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: once });
  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={cn("transition-all will-change-transform", isVisible ? styles.animated : styles.initial, className)}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
