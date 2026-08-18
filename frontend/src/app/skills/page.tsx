"use client";

import { useMemo, useState } from "react";
import { getSkills } from "@/services/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { SkillCard } from "@/components/skills/SkillCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { SkillListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { GraphHint } from "@/components/ui/GraphHint";
import { ActiveFilters, ResultsCount } from "@/components/ui/FilterHelpers";
import { useAsyncData, useDebouncedValue } from "@/hooks";

export default function SkillsPage() {
  const { data: skills, loading, error, reload } = useAsyncData(getSkills);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const debouncedSearch = useDebouncedValue(search);

  const categories = useMemo(() => {
    const set = new Set(skills?.map((s) => s.skill.category) ?? []);
    return ["all", ...Array.from(set).sort()];
  }, [skills]);

  const filtered = useMemo(() => {
    if (!skills) return [];
    const q = debouncedSearch.toLowerCase();
    return skills.filter((item) => {
      const matchesSearch =
        !q ||
        item.skill.name.toLowerCase().includes(q) ||
        item.skill.category.toLowerCase().includes(q);
      const matchesCategory =
        category === "all" || item.skill.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [skills, debouncedSearch, category]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const item of filtered) {
      const cat = item.skill.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const activeFilterCount = (search ? 1 : 0) + (category !== "all" ? 1 : 0);

  return (
    <div>
      <PageHeader
        graphPowered
        title="Skill Explorer"
        description="Skills are central nodes in the graph — they connect to jobs, technologies, and developers."
      />

      <GraphHint className="mb-6" path="Skill ← REQUIRES ← Job · Technology → RELATED_TO → Skill">
        Select a skill to see which jobs require it and which technologies map to it.
      </GraphHint>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <SearchInput
          label="Search skills"
          placeholder="Name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories.map((c) => ({
            value: c,
            label: c === "all" ? "All categories" : c,
          }))}
        />
      </div>

      <ActiveFilters
        count={activeFilterCount}
        onClear={() => {
          setSearch("");
          setCategory("all");
        }}
      />

      {loading && <SkillListSkeleton />}
      {error && !loading && <ErrorState message={error} onRetry={reload} />}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="No skills found"
          description="Try a different search or clear your category filter."
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-8">
          <ResultsCount showing={filtered.length} total={skills?.length ?? 0} noun="skills" />
          {grouped.map(([cat, items]) => (
            <section key={cat} aria-labelledby={`category-${cat}`}>
              <h2
                id={`category-${cat}`}
                className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]"
              >
                {cat}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <SkillCard key={item.skill.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
