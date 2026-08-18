import Link from "next/link";
import { notFound } from "next/navigation";
import {
  exploreGraph,
  getDetailPageError,
  getJob,
  getJobTechnologies,
} from "@/services/api";
import { BackLink } from "@/components/layout/BackLink";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraphHint } from "@/components/ui/GraphHint";
import { ConnectionList } from "@/components/graph/ConnectionList";
import { Button } from "@/components/ui/Button";
import { DetailPageError } from "@/components/ui/DetailPageError";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;

  let jobDetail;
  let technologies;
  let graphConnections;

  try {
    [jobDetail, technologies, graphConnections] = await Promise.all([
      getJob(id),
      getJobTechnologies(id),
      exploreGraph(id, "Job"),
    ]);
  } catch (error) {
    const { notFound: isNotFound, message } = getDetailPageError(error);
    if (isNotFound) notFound();
    return (
      <DetailPageError
        backHref="/jobs"
        backLabel="Back to jobs"
        message={message}
        retryHref={`/jobs/${id}`}
      />
    );
  }

  if (!jobDetail.job) notFound();

  const { job, company, requiredSkills } = jobDetail;

  return (
    <div>
      <BackLink href="/jobs" label="Back to jobs" />

      <PageHeader
        graphPowered
        title={job.title}
        description={
          company
            ? `${company.name} · ${job.location}`
            : job.location
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="primary">{job.experienceLevel}</Badge>
        <Badge variant="muted">{job.employmentType}</Badge>
        {company?.industry && <Badge variant="muted">{company.industry}</Badge>}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <SectionHeading title="About this role" />
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {job.description}
            </p>
          </Card>

          <Card>
            <SectionHeading
              title="Required skills"
              description="Skills this job requires in the graph (Job → REQUIRES → Skill)"
              count={requiredSkills.length}
            />
            {requiredSkills.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No skills listed.</p>
            ) : (
              <ul className="space-y-2" role="list">
                {requiredSkills.map((skill) => (
                  <li
                    key={skill.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3"
                  >
                    <div>
                      <Link
                        href={`/skills/${skill.id}`}
                        className="font-medium hover:text-[var(--primary)]"
                      >
                        {skill.name}
                      </Link>
                      <p className="text-xs text-[var(--muted)]">{skill.category}</p>
                    </div>
                    <div className="flex gap-2">
                      {skill.importance && (
                        <Badge
                          variant={
                            skill.importance === "required" ? "warning" : "muted"
                          }
                        >
                          {skill.importance}
                        </Badge>
                      )}
                      {skill.minLevel != null && (
                        <Badge variant="muted">Lv {skill.minLevel}+</Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <SectionHeading
              title="Connected technologies"
              description="Technologies linked through required skills (2-hop traversal)"
            />
            <GraphHint
              className="mb-4"
              path="Job → REQUIRES → Skill ← RELATED_TO ← Technology"
            >
              These technologies relate to skills this job requires. The path
              crosses two relationship hops in the graph.
            </GraphHint>
            {technologies.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                No related technologies found in the graph.
              </p>
            ) : (
              <ul className="space-y-2" role="list">
                {technologies.map((item) => (
                  <li
                    key={item.technology.id}
                    className="rounded-lg border border-[var(--border)] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{item.technology.name}</span>
                      <Badge variant="primary">{item.technology.category}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      Related skills:{" "}
                      {item.viaSkills.map((s) => s.skillName).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          {company && (
            <Card>
              <SectionHeading title="Company" />
              <p className="font-medium">{company.name}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{company.location}</p>
              {company.industry && (
                <p className="mt-1 text-sm text-[var(--muted)]">{company.industry}</p>
              )}
            </Card>
          )}

          <Card>
            <SectionHeading
              title="Graph connections"
              description="Direct neighbors of this job node (1-hop)"
            />
            <GraphHint className="mb-4">
              Each connection shows a relationship type and direction from this job
              to another entity in CognoDB.
            </GraphHint>
            <ConnectionList connections={graphConnections.connections} />
            <div className="mt-4">
              <Link href={`/explore?nodeId=${id}&label=Job`}>
                <Button variant="secondary" size="sm" className="w-full">
                  Open in Graph Explorer
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
