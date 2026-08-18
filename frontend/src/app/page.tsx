import Link from "next/link";
import { getDashboardStats } from "@/services/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { GraphHint } from "@/components/ui/GraphHint";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let stats = { jobs: 0, skills: 0, companies: 0, technologies: 0 };
  let error: string | null = null;

  try {
    stats = await getDashboardStats();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load stats";
  }

  return (
    <div>
      <PageHeader
        graphPowered
        title="Job & Skill Graph Explorer"
        description="Discover job opportunities by traversing relationships between skills, technologies, companies, and roles — not by keyword search alone."
      />

      <GraphHint
        className="mb-8"
        path="Developer → HAS_SKILL → Skill ← REQUIRES ← Job"
      >
        JobGraph uses CognoDB to traverse connections in the graph. Each stat below
        represents a node type in the live dataset.
      </GraphHint>

      {error ? (
        <div
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
          role="alert"
        >
          Could not load live stats: {error}. Start the backend with{" "}
          <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/50">
            npm run dev:backend
          </code>
        </div>
      ) : (
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/jobs" className="block">
            <StatCard label="Jobs" value={stats.jobs} />
          </Link>
          <Link href="/skills" className="block">
            <StatCard label="Skills" value={stats.skills} />
          </Link>
          <Link href="/explore?nodeId=co-wexa-ai&label=Company" className="block">
            <StatCard label="Companies" value={stats.companies} />
          </Link>
          <Link href="/explore?nodeId=tech-neo4j&label=Technology" className="block">
            <StatCard label="Technologies" value={stats.technologies} />
          </Link>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">How graph discovery works</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              <strong className="text-[var(--foreground)]">Direct match</strong> — find
              jobs that require skills you select
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Technology bridge</strong> —{" "}
              Job → Skill → Technology reveals tools behind each role
            </li>
            <li>
              <strong className="text-[var(--foreground)]">Neighborhood explore</strong>{" "}
              — click any node to see its 1-hop connections
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Start exploring</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Each page demonstrates a different graph traversal from the CognoDB
            dataset.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/recommendations">
              <Button variant="primary" size="sm">
                Skill-based recommendations
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="sm">
                Graph Explorer
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
