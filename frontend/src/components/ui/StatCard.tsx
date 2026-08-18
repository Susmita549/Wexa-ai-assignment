import { cn } from "@/utils/cn";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
        {icon && <div className="text-[var(--primary)]">{icon}</div>}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
