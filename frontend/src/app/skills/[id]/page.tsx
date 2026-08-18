import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkillRelated, exploreGraph } from "@/services/api";
import { BackLink } from "@/components/layout/BackLink";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraphHint } from "@/components/ui/GraphHint";
import { ConnectionList } from "@/components/graph/ConnectionList";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SkillDetailPage({ params }: Props) {
  const { id } = await params;

  let related;
  let graph;

  try {
    [related, graph] = await Promise.all([
      getSkillRelated(id),
      exploreGraph(id, "Skill"),
    ]);
  } catch {
    notFound();
  }

  const { skill, technologies, jobs } = related;

  return (
    <div>
      <BackLink href="/skills" label="Back to skills" />

      <PageHeader
        graphPowered
        title={skill.name}
        description={`${skill.category} · ${technologies.length} connected technologies · ${jobs.length} connected jobs`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <SectionHeading
              title="Related technologies"
              description="Technologies that map to this skill in the graph"
            />
            <GraphHint className="mb-4" path="Technology → RELATED_TO → Skill">
              Each technology implies this skill with a RELATED_TO edge in CognoDB.
            </GraphHint>
            {technologies.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No technologies linked.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Link key={tech.id} href={`/explore?nodeId=${tech.id}&label=Technology`}>
                    <Badge variant="primary" className="cursor-pointer hover:opacity-80">
                      {tech.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <SectionHeading
              title="Jobs requiring this skill"
              description="Roles connected via Job → REQUIRES → Skill"
              count={jobs.length}
            />
            {jobs.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No jobs require this skill.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {jobs.map(({ job, company }) =>
                  job ? (
                    <li key={job.id}>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="block rounded-lg border border-[var(--border)] p-4 transition-colors hover:border-[var(--primary)]"
                      >
                        <p className="font-medium">{job.title}</p>
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {company?.name} · {job.location} · {job.experienceLevel}
                        </p>
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </Card>
        </div>

        <Card>
          <SectionHeading
            title="Graph connections"
            description="1-hop neighbors of this skill"
          />
          <GraphHint className="mb-4">
            Each row shows a relationship type and direction from this skill to
            another entity in CognoDB.
          </GraphHint>
          <ConnectionList connections={graph.connections} />
          <div className="mt-4">
            <Link href={`/explore?nodeId=${id}&label=Skill`}>
              <Button variant="secondary" size="sm" className="w-full">
                Open in Graph Explorer
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
