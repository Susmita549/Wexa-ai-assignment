interface LoadingSpinnerProps {
  label?: string;
}

export function LoadingSpinner({ label = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]"
        aria-hidden
      />
      <p className="text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
}
