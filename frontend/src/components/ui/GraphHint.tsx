import { cn } from "@/utils/cn";

interface GraphHintProps {
  children: React.ReactNode;
  path?: string;
  className?: string;
}

/**
 * Contextual note explaining how a section uses graph relationships.
 * Only include paths that match actual Cypher traversals in the backend.
 */
export function GraphHint({ children, path, className }: GraphHintProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-indigo-200/60 bg-indigo-50/50 px-4 py-3 dark:border-indigo-900/40 dark:bg-indigo-950/20",
        className
      )}
      role="note"
    >
      <div className="flex gap-3">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <div className="min-w-0">
          <p className="text-sm leading-relaxed text-[var(--foreground)]/80">
            {children}
          </p>
          {path && (
            <p className="mt-1.5 font-mono text-xs text-[var(--primary)]">
              {path}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
