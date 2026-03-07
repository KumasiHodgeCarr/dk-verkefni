"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "./theme-toggle";

interface NavLink {
  label: string;
  path: string;
  icon: ReactNode;
}

// Desktop nav item — defined outside DashboardNav to keep stable identity for layoutId
function NavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = pathname === link.path;

  return (
    <motion.li whileTap={{ scale: 0.95 }} className="relative">
      <Link
        href={link.path}
        className={cn(
          "flex gap-1 flex-col items-center text-muted-foreground hover:text-foreground transition-colors",
          isActive && "text-primary",
        )}
      >
        <span className="w-5 h-5">{link.icon}</span>
        <span className="text-xs font-semibold">{link.label}</span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
            layoutId="underline"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

// Mobile nav item — staggered entrance animation via index
function MobileNavItem({
  link,
  pathname,
  index,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  index: number;
  onNavigate: () => void;
}) {
  const isActive = pathname === link.path;

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Link
        href={link.path}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <span className="w-5 h-5">{link.icon}</span>
        <span className="font-medium">{link.label}</span>
      </Link>
    </motion.li>
  );
}

export default function DashboardNav({
  leftLinks,
}: {
  leftLinks: NavLink[];
  rightContent?: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-4 md:px-6 py-3 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between">
        {/* Mobile hamburger button - using shadcn SheetTrigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b border-border px-4 py-4">
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>

              <nav className="p-4">
                <ul className="flex flex-col gap-1">
                  {leftLinks.map((link, index) => (
                    <MobileNavItem
                      key={link.path}
                      link={link}
                      pathname={pathname}
                      index={index}
                      onNavigate={() => setOpen(false)}
                    />
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop navigation - with motion */}
        <ul className="hidden md:flex items-center gap-6">
          {leftLinks.map((link) => (
            <NavItem key={link.path} link={link} pathname={pathname} />
          ))}
        </ul>

        {/* Right side content */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
