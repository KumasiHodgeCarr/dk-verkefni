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

function NavItem({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = pathname === link.path;

  return (
    <motion.li whileTap={{ scale: 0.95 }} className="relative">
      <Link
        href={link.path}
        className={cn(
          "flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground transition-colors hover:text-foreground",
          isActive && "text-foreground",
        )}
      >
        <span className="size-5">{link.icon}</span>
        <span className="text-xs font-medium">{link.label}</span>
        {isActive && (
          <motion.div
            className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-foreground"
            layoutId="nav-underline"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

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
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <Link
        href={link.path}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-colors",
          isActive
            ? "bg-foreground text-background"
            : "hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <span className="size-5">{link.icon}</span>
        <span className="font-medium">{link.label}</span>
      </Link>
    </motion.li>
  );
}

export default function DashboardNav({ leftLinks }: { leftLinks: NavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14  items-center justify-between px-4 ">
        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b border-border px-4 py-4">
                <SheetTitle className="text-left text-lg font-semibold">
                  Conflict Lens
                </SheetTitle>
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

        {/* Logo - centered on mobile, left on desktop */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <span className="text-lg font-bold tracking-tight">
            Conflict Lens
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-2 md:flex">
          {leftLinks.map((link) => (
            <NavItem key={link.path} link={link} pathname={pathname} />
          ))}
        </ul>

        {/* Theme toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
