interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  graphPowered?: boolean;
}

export function PageHeader({
  title,
  description,
  action,
  graphPowered = false,
}: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-[var(--border)] pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          {graphPowered && (
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
              <span aria-hidden>◆</span> Graph-powered
            </p>
          )}
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}
