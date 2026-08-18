"use client";

interface ActiveFiltersProps {
  count: number;
  onClear: () => void;
}

export function ActiveFilters({ count, onClear }: ActiveFiltersProps) {
  if (count === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <span className="text-sm text-[var(--muted)]">
        {count} filter{count !== 1 ? "s" : ""} active
      </span>
      <button
        type="button"
        onClick={onClear}
        className="text-sm font-medium text-[var(--primary)] hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}

interface ResultsCountProps {
  showing: number;
  total: number;
  noun?: string;
}

export function ResultsCount({ showing, total, noun = "results" }: ResultsCountProps) {
  return (
    <p className="mb-4 text-sm text-[var(--muted)]" aria-live="polite" aria-atomic="true">
      Showing {showing} of {total} {noun}
    </p>
  );
}
