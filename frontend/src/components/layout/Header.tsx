"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/", label: "Dashboard", short: "Home" },
  { href: "/jobs", label: "Jobs", short: "Jobs" },
  { href: "/skills", label: "Skills", short: "Skills" },
  { href: "/recommendations", label: "Recommendations", short: "Match" },
  { href: "/explore", label: "Graph Explorer", short: "Graph" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white"
            aria-hidden
          >
            JG
          </div>
          <div className="min-w-0">
            <span className="block text-base font-bold tracking-tight sm:text-lg">
              JobGraph
            </span>
            <span className="hidden text-xs text-[var(--muted)] sm:block">
              Graph-powered discovery
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <nav
        className="flex gap-1 overflow-x-auto border-t border-[var(--border)] px-4 py-2 lg:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium",
                active
                  ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "text-[var(--muted)]"
              )}
            >
              {item.short}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
