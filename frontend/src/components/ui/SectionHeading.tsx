interface SectionHeadingProps {
  title: string;
  description?: string;
  count?: number;
}

export function SectionHeading({ title, description, count }: SectionHeadingProps) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {count !== undefined && (
          <span className="text-sm text-[var(--muted)]">({count})</span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
