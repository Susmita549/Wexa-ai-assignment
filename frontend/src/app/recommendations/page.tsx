"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getRecommendations, getSkills } from "@/services/api";
import type { JobRecommendation, SkillListItem } from "@/types/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MatchProgress } from "@/components/ui/MatchProgress";
import { GraphHint } from "@/components/ui/GraphHint";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useAsyncData } from "@/hooks";

export default function RecommendationsPage() {
  const { data: skills, loading: skillsLoading, error: skillsError, reload } =
    useAsyncData(getSkills);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [recommendations, setRecommendations] = useState<
    JobRecommendation[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const selectedSkillNames = useMemo(() => {
    if (!skills) return [];
    return skills
      .filter((s) => selected.has(s.skill.id))
      .map((s) => s.skill.name);
  }, [skills, selected]);

  const toggleSkill = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const groupedSkills = useMemo(() => {
    if (!skills) return [];
    const map = new Map<string, SkillListItem[]>();
    for (const item of skills) {
      const cat = item.skill.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [skills]);

  const handleRecommend = async () => {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);
    try {
      const results = await getRecommendations(Array.from(selected));
      setRecommendations(results);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get recommendations");
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        graphPowered
        title="Job Recommendations"
        description="Select skills you have — we'll traverse the graph to find jobs whose requirements overlap."
      />

      <GraphHint className="mb-6" path="Your Skills → Skill ← REQUIRES ← Job">
        Rankings are based on how many of your selected skills match each job&apos;s
        requirements via the REQUIRES relationship in CognoDB.
      </GraphHint>

      {skillsLoading && <LoadingSpinner label="Loading skills..." />}
      {skillsError && <ErrorState message={skillsError} onRetry={reload} />}

      {!skillsLoading && !skillsError && (
        <Card className="mb-8">
          <SectionHeading
            title="Select your skills"
            description={
              selected.size > 0
                ? `Selected: ${selectedSkillNames.join(", ")}`
                : "Choose one or more skills to find matching jobs"
            }
            count={selected.size}
          />
          <div className="space-y-6">
            {groupedSkills.map(([category, items]) => (
              <div key={category}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label={`${category} skills`}>
                  {items.map(({ skill }) => {
                    const isSelected = selected.has(skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                          isSelected
                            ? "bg-[var(--primary)] text-white"
                            : "border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]"
                        }`}
                        aria-pressed={isSelected}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={handleRecommend}
              disabled={selected.size === 0 || loading}
            >
              {loading ? "Finding matches..." : "Find matching jobs"}
            </Button>
            {selected.size > 0 && (
              <Button variant="ghost" onClick={() => setSelected(new Set())}>
                Clear selection
              </Button>
            )}
          </div>
        </Card>
      )}

      {loading && <LoadingSpinner label="Traversing skill → job relationships..." />}

      {error && !loading && (
        <ErrorState message={error} onRetry={handleRecommend} />
      )}

      {!loading && recommendations && recommendations.length === 0 && (
        <EmptyState
          title="No matching jobs"
          description="None of the jobs in the graph require your selected skills. Try a different combination."
        />
      )}

      {!loading && recommendations && recommendations.length > 0 && (
        <div ref={resultsRef} className="space-y-4">
          <SectionHeading
            title="Why these jobs match"
            description={`${recommendations.length} jobs ranked by skill overlap via graph traversal`}
          />
          {recommendations.map((rec, index) => (
            <Card key={rec.job.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)]/10 text-xs font-bold text-[var(--primary)]">
                      {index + 1}
                    </span>
                    <Link
                      href={`/jobs/${rec.job.id}`}
                      className="text-lg font-semibold hover:text-[var(--primary)]"
                    >
                      {rec.job.title}
                    </Link>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {rec.company?.name} · {rec.job.location}
                  </p>
                </div>
                <Badge variant="primary">
                  {rec.matchedCount} of {rec.jobRequirementCount} requirements met
                </Badge>
              </div>

              <GraphHint className="my-4">
                This job matches because {rec.matchedCount} of its required skills
                overlap with your selection via Skill ← REQUIRES ← Job paths in
                the graph.
              </GraphHint>

              <div className="grid gap-4 sm:grid-cols-2">
                <MatchProgress
                  label="Your skills utilized"
                  percentage={rec.userMatchPercentage}
                />
                <MatchProgress
                  label="Job requirements covered"
                  percentage={rec.jobCoveragePercentage}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Matched skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.matchedSkills.map((s) => (
                      <Badge key={s.id} variant="success">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Skills to develop
                  </p>
                  {rec.missingSkills.length === 0 ? (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      You meet all listed requirements.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {rec.missingSkills.map((name) => (
                        <Badge key={name} variant="warning">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
