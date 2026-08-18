export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-[var(--muted)]">
          JobGraph — relationship-first job discovery powered by{" "}
          <span className="font-medium text-[var(--foreground)]">CognoDB</span>
        </p>
        <p className="text-xs text-[var(--muted-light)]">
          Graph traversals via openCypher · Neo4j driver
        </p>
      </div>
    </footer>
  );
}
