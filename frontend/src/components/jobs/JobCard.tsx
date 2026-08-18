import Link from "next/link";
import type { JobListItem } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function JobCard({ item }: { item: JobListItem }) {
  const { job, company } = item;
  return (
    <Link href={`/jobs/${job.id}`} className="group block h-full">
      <Card hover className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-snug group-hover:text-[var(--primary)]">
              {job.title}
            </h3>
            {company && (
              <p className="mt-1 text-sm text-[var(--muted)]">{company.name}</p>
            )}
          </div>
          <Badge variant="primary">{job.experienceLevel}</Badge>
        </div>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="muted">{job.location}</Badge>
            <Badge variant="muted">{job.employmentType}</Badge>
          </div>
          <span className="text-xs font-medium text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100">
            View graph →
          </span>
        </div>
      </Card>
    </Link>
  );
}
