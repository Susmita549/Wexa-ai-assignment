export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          JobGraph — relationship-first job discovery powered by{" "}
          <a
            href="https://cognodb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--foreground)] underline-offset-2 hover:text-[var(--primary)] hover:underline"
          >
            CognoDB
          </a>
        </p>
        <p className="text-xs text-[var(--muted-light)] sm:text-right">
          Graph traversals via openCypher · Neo4j driver
        </p>
      </div>
    </footer>
  );
}
