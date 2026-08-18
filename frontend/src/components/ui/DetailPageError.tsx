import Link from "next/link";
import { BackLink } from "@/components/layout/BackLink";

interface DetailPageErrorProps {
  backHref: string;
  backLabel: string;
  message: string;
  retryHref: string;
}

export function DetailPageError({
  backHref,
  backLabel,
  message,
  retryHref,
}: DetailPageErrorProps) {
  return (
    <div>
      <BackLink href={backHref} label={backLabel} />
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30"
        role="alert"
      >
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
          <svg
            className="h-5 w-5 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-red-800 dark:text-red-200">
          Something went wrong
        </h3>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">{message}</p>
        <Link
          href={retryHref}
          className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}
