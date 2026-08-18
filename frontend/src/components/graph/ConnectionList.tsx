import type { GraphExploreConnection } from "@/types/api";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface ConnectionListProps {
  connections: GraphExploreConnection[];
  onSelect?: (connection: GraphExploreConnection) => void;
}

const LABEL_COLORS: Record<string, "primary" | "success" | "warning" | "muted"> = {
  Developer: "primary",
  Skill: "success",
  Job: "warning",
  Company: "muted",
  Project: "primary",
  Technology: "success",
};

function directionLabel(direction: string): string {
  if (direction === "outgoing") return "Outgoing edge";
  if (direction === "incoming") return "Incoming edge";
  return direction;
}

export function ConnectionList({ connections, onSelect }: ConnectionListProps) {
  if (connections.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        No direct connections found for this node.
      </p>
    );
  }

  return (
    <ul className="space-y-2" role="list">
      {connections.map((conn) => {
        const primaryLabel = conn.labels[0] ?? "Node";
        const badgeVariant = LABEL_COLORS[primaryLabel] ?? "muted";

        return (
          <li key={`${conn.id}-${conn.relationship}-${conn.direction}`}>
            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(conn)}
                className={cn(
                  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)]/50 p-4 text-left transition-colors",
                  "hover:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                )}
                aria-label={`Navigate to ${conn.name}, ${primaryLabel}, via ${conn.relationship}`}
              >
                <ConnectionContent conn={conn} badgeVariant={badgeVariant} primaryLabel={primaryLabel} />
              </button>
            ) : (
              <div className="rounded-lg border border-[var(--border)] bg-[var(--background)]/50 p-4">
                <ConnectionContent conn={conn} badgeVariant={badgeVariant} primaryLabel={primaryLabel} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ConnectionContent({
  conn,
  badgeVariant,
  primaryLabel,
}: {
  conn: GraphExploreConnection;
  badgeVariant: "primary" | "success" | "warning" | "muted";
  primaryLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{conn.name}</p>
        <p className="mt-0.5 text-xs text-[var(--muted)]">{primaryLabel}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <Badge variant={badgeVariant}>{conn.relationship}</Badge>
        <span className="text-xs text-[var(--muted-light)]" title={directionLabel(conn.direction)}>
          {conn.direction === "incoming" ? "← in" : conn.direction === "outgoing" ? "→ out" : conn.direction}
        </span>
      </div>
    </div>
  );
}
