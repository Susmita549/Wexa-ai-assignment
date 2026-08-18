import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div>
      <PageHeader
        title="Page not found"
        description="The page you requested does not exist in this application."
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/">
          <Button variant="primary">Back to dashboard</Button>
        </Link>
        <Link href="/jobs">
          <Button variant="secondary">Browse jobs</Button>
        </Link>
      </div>
    </div>
  );
}
