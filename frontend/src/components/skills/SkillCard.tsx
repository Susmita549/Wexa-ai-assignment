import Link from "next/link";
import type { SkillListItem } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function SkillCard({ item }: { item: SkillListItem }) {
  const { skill, jobCount, technologyCount } = item;
  return (
    <Link href={`/skills/${skill.id}`} className="group block h-full">
      <Card hover className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug group-hover:text-[var(--primary)]">
            {skill.name}
          </h3>
          <Badge variant="primary">{skill.category}</Badge>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex gap-3 text-sm text-[var(--muted)]">
            <span>{jobCount} jobs</span>
            <span aria-hidden>·</span>
            <span>{technologyCount} tech</span>
          </div>
          <span className="text-xs font-medium text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100">
            Explore →
          </span>
        </div>
      </Card>
    </Link>
  );
}
