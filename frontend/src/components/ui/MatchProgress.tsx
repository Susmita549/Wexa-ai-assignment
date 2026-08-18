import { cn } from "@/utils/cn";

interface MatchProgressProps {
  label: string;
  percentage: number;
  className?: string;
}

export function MatchProgress({ label, percentage, className }: MatchProgressProps) {
  const pct = Math.round(percentage * 100);
  const color =
    pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-orange-500";

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-[var(--muted)]">{label}</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${Math.min(pct, 100)}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
