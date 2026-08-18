"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { exploreGraph } from "@/services/api";
import type { GraphExploreConnection, GraphExploreResult, NodeLabel } from "@/types/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { EntitySelector } from "@/components/graph/EntitySelector";
import { ConnectionList } from "@/components/graph/ConnectionList";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { GraphHint } from "@/components/ui/GraphHint";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

const PRESETS: Array<{ label: string; nodeId: string; nodeLabel: NodeLabel }> = [
  { label: "Graph Databases", nodeId: "skill-graph-db", nodeLabel: "Skill" },
  { label: "Graph Engineer @ Wexa", nodeId: "job-graph-engineer-wexa", nodeLabel: "Job" },
  { label: "Alice Chen", nodeId: "dev-alice-chen", nodeLabel: "Developer" },
  { label: "Wexa AI", nodeId: "co-wexa-ai", nodeLabel: "Company" },
  { label: "JobGraph project", nodeId: "proj-jobgraph", nodeLabel: "Project" },
  { label: "Neo4j", nodeId: "tech-neo4j", nodeLabel: "Technology" },
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const [nodeId, setNodeId] = useState(
    searchParams.get("nodeId") ?? "skill-graph-db"
  );
  const [label, setLabel] = useState<NodeLabel>(
    (searchParams.get("label") as NodeLabel) ?? "Skill"
  );
  const [result, setResult] = useState<GraphExploreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<
    Array<{ nodeId: string; label: NodeLabel; name: string }>
  >([]);
  const [initialized, setInitialized] = useState(false);

  const explore = useCallback(async (id: string, lbl: NodeLabel) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await exploreGraph(id.trim(), lbl);
      setResult(data);
      const centerName = String(data.center?.name ?? data.center?.title ?? id);
      setHistory((prev) => {
        const entry = { nodeId: id, label: lbl, name: centerName };
        const filtered = prev.filter((h) => h.nodeId !== id || h.label !== lbl);
        return [...filtered, entry].slice(-8);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Exploration failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const qId = searchParams.get("nodeId");
    const qLabel = searchParams.get("label") as NodeLabel | null;
    if (qId && qLabel) {
      setNodeId(qId);
      setLabel(qLabel);
      explore(qId, qLabel);
      setInitialized(true);
    } else if (!initialized) {
      explore(nodeId, label);
      setInitialized(true);
    }
  }, [searchParams, explore, initialized, nodeId, label]);

  const handleConnectionClick = (conn: GraphExploreConnection) => {
    const connLabel = conn.labels[0] as NodeLabel;
    if (!connLabel) return;
    setNodeId(conn.id);
    setLabel(connLabel);
    explore(conn.id, connLabel);
  };

  return (
    <>
      <Card className="mb-6">
        <SectionHeading
          title="Select a graph node"
          description="Choose an entity type and ID, then explore its direct relationships"
        />
        <GraphHint className="mb-4">
          Click any connection below to walk the graph. Each step follows a real
          edge stored in CognoDB.
        </GraphHint>
        <EntitySelector
          nodeId={nodeId}
          label={label}
          onNodeIdChange={setNodeId}
          onLabelChange={setLabel}
          onExplore={() => explore(nodeId, label)}
          loading={loading}
        />
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Example starting points
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.nodeId}
                type="button"
                onClick={() => {
                  setNodeId(preset.nodeId);
                  setLabel(preset.nodeLabel);
                  explore(preset.nodeId, preset.nodeLabel);
                }}
                className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {history.length > 1 && (
        <nav aria-label="Exploration history" className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Path taken
          </p>
          <div className="flex flex-wrap items-center gap-1">
            {history.map((h, i) => (
              <span key={`${h.label}-${h.nodeId}`} className="flex items-center gap-1">
                {i > 0 && <span className="text-[var(--muted-light)]" aria-hidden>→</span>}
                <button
                  type="button"
                  onClick={() => {
                    setNodeId(h.nodeId);
                    setLabel(h.label);
                    explore(h.nodeId, h.label);
                  }}
                  className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20"
                >
                  {h.name}
                </button>
              </span>
            ))}
          </div>
        </nav>
      )}

      {loading && <LoadingSpinner label="Querying graph neighborhood..." />}

      {error && !loading && (
        <ErrorState message={error} onRetry={() => explore(nodeId, label)} />
      )}

      {!loading && !error && result && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <SectionHeading title="Current node" />
            <p className="text-lg font-semibold">
              {String(result.center?.name ?? result.center?.title ?? nodeId)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(result.center?.labels as string[] | undefined)?.map((l) => (
                <Badge key={l} variant="primary">
                  {l}
                </Badge>
              )) ?? <Badge variant="primary">{label}</Badge>}
            </div>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">{nodeId}</p>
          </Card>

          <Card className="lg:col-span-2">
            <SectionHeading
              title="Connected entities"
              description={`${result.connections.length} direct relationships (1-hop)`}
            />
            {result.connections.length === 0 ? (
              <EmptyState
                title="No connections"
                description="This node has no direct neighbors in the graph."
              />
            ) : (
              <>
                <p className="mb-3 text-xs text-[var(--muted)]">
                  Click a connection to navigate further through the graph.
                </p>
                <ConnectionList
                  connections={result.connections}
                  onSelect={handleConnectionClick}
                />
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default function ExplorePage() {
  return (
    <div>
      <PageHeader
        graphPowered
        title="Graph Explorer"
        description="Walk the graph one relationship at a time. Each view shows a node and its direct neighbors from CognoDB."
      />
      <Suspense fallback={<LoadingSpinner label="Loading explorer..." />}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
