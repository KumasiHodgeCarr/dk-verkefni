"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

interface NavLink {
  label: string;
  path: string;
  icon: ReactNode;
}

// Defined outside DashboardNav so React never remounts it between renders,
// which would break the layoutId animation context
function NavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  return (
    <motion.li whileTap={{ scale: 0.95 }}>
      <Link
        href={link.path}
        className={cn(
          "flex gap-1 flex-col items-center relative",
          pathname === link.path && "text-primary",
        )}
      >
        {link.icon}
        {link.label}
        {/* Sliding underline — shared layoutId animates between active links */}
        {pathname === link.path && (
          <motion.div
            className="h-0.5 w-full rounded-full absolute bg-primary left-0 -bottom-1"
            layoutId="underline"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

export default function DashboardNav({
  leftLinks,
}: {
  leftLinks: NavLink[];
  rightLinks?: NavLink[];
}) {
  const pathname = usePathname();

  return (
    <nav className="px-6 py-3 border-b border-border">
      <div className="flex items-center justify-between">
        {/* Left side — primary nav links */}
        <ul className="flex items-center justify-between text-xs font-semibold gap-6">
          {leftLinks.map((link) => (
            <NavItem key={link.path} link={link} pathname={pathname} />
          ))}
        </ul>

        {/* Right side theme toggle */}
        <div className="flex items-center ">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
