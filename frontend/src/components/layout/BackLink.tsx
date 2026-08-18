import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
      >
        <span aria-hidden>←</span>
        {label}
      </Link>
    </nav>
  );
}
