// if errors occur for example reddit down?

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 space-y-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft size={16} /> Back
      </Link>
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <p className="font-semibold">Failed to load post</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Reddit may be rate-limiting requests. Try again in a moment.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
