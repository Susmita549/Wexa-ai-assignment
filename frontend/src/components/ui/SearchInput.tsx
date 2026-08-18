import { cn } from "@/utils/cn";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function SearchInput({ label, className, id, ...props }: SearchInputProps) {
  const inputId = id ?? "search";
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
        <input
          id={inputId}
          type="search"
          className={cn(
            "w-full rounded-lg border border-[var(--border)] bg-[var(--card)] py-2.5 pl-10 pr-4 text-sm placeholder:text-[var(--muted-light)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
