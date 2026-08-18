"use client";

import { useMemo, useState } from "react";
import { getJobs } from "@/services/api";
import type { JobListItem } from "@/types/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { JobCard } from "@/components/jobs/JobCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { JobListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { GraphHint } from "@/components/ui/GraphHint";
import { ActiveFilters, ResultsCount } from "@/components/ui/FilterHelpers";
import { useAsyncData, useDebouncedValue } from "@/hooks";

export default function JobsPage() {
  const { data: jobs, loading, error, reload } = useAsyncData(getJobs);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const debouncedSearch = useDebouncedValue(search);

  const filtered = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((item: JobListItem) => {
      const q = debouncedSearch.toLowerCase();
      const matchesSearch =
        !q ||
        item.job.title.toLowerCase().includes(q) ||
        item.job.description.toLowerCase().includes(q) ||
        item.company?.name.toLowerCase().includes(q) ||
        item.job.location.toLowerCase().includes(q);
      const matchesLevel =
        levelFilter === "all" || item.job.experienceLevel === levelFilter;
      const matchesType =
        typeFilter === "all" || item.job.employmentType === typeFilter;
      return matchesSearch && matchesLevel && matchesType;
    });
  }, [jobs, debouncedSearch, levelFilter, typeFilter]);

  const levels = useMemo(() => {
    const set = new Set(jobs?.map((j) => j.job.experienceLevel) ?? []);
    return ["all", ...Array.from(set).sort()];
  }, [jobs]);

  const types = useMemo(() => {
    const set = new Set(jobs?.map((j) => j.job.employmentType) ?? []);
    return ["all", ...Array.from(set).sort()];
  }, [jobs]);

  const activeFilterCount =
    (search ? 1 : 0) +
    (levelFilter !== "all" ? 1 : 0) +
    (typeFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setLevelFilter("all");
    setTypeFilter("all");
  };

  return (
    <div>
      <PageHeader
        graphPowered
        title="Jobs"
        description="Each job connects to a company and required skills in the graph. Open a role to see its relationships."
      />

      <GraphHint className="mb-6" path="Job → REQUIRES → Skill · Job → POSTED_BY → Company">
        Jobs are nodes linked to skills and companies. Select a job to view its graph
        connections and related technologies.
      </GraphHint>

      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <SearchInput
          label="Search jobs"
          placeholder="Title, company, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Experience level"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          options={levels.map((l) => ({
            value: l,
            label: l === "all" ? "All levels" : l,
          }))}
        />
        <Select
          label="Employment type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          options={types.map((t) => ({
            value: t,
            label: t === "all" ? "All types" : t,
          }))}
        />
      </div>

      <ActiveFilters count={activeFilterCount} onClear={clearFilters} />

      {loading && <JobListSkeleton />}

      {error && !loading && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={jobs?.length === 0 ? "No jobs in the graph" : "No jobs match your filters"}
          description={
            jobs?.length === 0
              ? "Run npm run db:seed to populate the database."
              : "Try clearing filters or broadening your search."
          }
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <ResultsCount showing={filtered.length} total={jobs?.length ?? 0} noun="jobs" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <JobCard key={item.job.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
