"use client";

import type { NodeLabel } from "@/types/api";

interface EntitySelectorProps {
  nodeId: string;
  label: NodeLabel;
  onNodeIdChange: (id: string) => void;
  onLabelChange: (label: NodeLabel) => void;
  onExplore: () => void;
  loading?: boolean;
}

const LABELS: NodeLabel[] = [
  "Developer",
  "Skill",
  "Job",
  "Company",
  "Project",
  "Technology",
];

export function EntitySelector({
  nodeId,
  label,
  onNodeIdChange,
  onLabelChange,
  onExplore,
  loading,
}: EntitySelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <label htmlFor="node-label" className="mb-1.5 block text-sm font-medium">
          Entity type
        </label>
        <select
          id="node-label"
          value={label}
          onChange={(e) => onLabelChange(e.target.value as NodeLabel)}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          {LABELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="node-id" className="mb-1.5 block text-sm font-medium">
          Entity ID
        </label>
        <div className="flex gap-2">
          <input
            id="node-id"
            type="text"
            value={nodeId}
            onChange={(e) => onNodeIdChange(e.target.value)}
            placeholder="e.g. skill-graph-db"
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
          <button
            type="button"
            onClick={onExplore}
            disabled={loading || !nodeId.trim()}
            className="rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-50"
          >
            {loading ? "..." : "Explore"}
          </button>
        </div>
      </div>
    </div>
  );
}
