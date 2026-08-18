import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "muted";
  className?: string;
}

const variants = {
  default: "bg-[var(--border)] text-[var(--foreground)]",
  primary: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  muted: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
