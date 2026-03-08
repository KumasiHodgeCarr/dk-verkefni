export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

export function HomePageSkeleton() {
  return (
    <main className="space-y-8 md:space-y-10 px-4">
      <section className="py-4 space-y-4 text-center">
        <SkeletonBlock className="mx-auto h-14 w-14 rounded-2xl" />
        <SkeletonBlock className="mx-auto h-8 w-48" />
        <SkeletonBlock className="mx-auto h-5 w-72" />
      </section>
      <section className="space-y-4">
        <SkeletonBlock className="h-6 w-32" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <SkeletonBlock className="h-64" />
          <SkeletonBlock className="h-64" />
        </div>
      </section>
      <SkeletonBlock className="h-28" />
    </main>
  );
}

export function PostPageSkeleton() {
  return (
    <main className="space-y-4 px-4">
      <SkeletonBlock className="h-7 w-24 rounded-md" />
      <SkeletonBlock className="h-8 w-3/4" />
      <SkeletonBlock className="h-4 w-32" />
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-12" />
        ))}
      </div>
      <SkeletonBlock className="w-full aspect-video mt-4" />
      <div className="mt-6 space-y-4">
        <SkeletonBlock className="mx-auto h-6 w-36" />
        <div className="grid grid-cols-3 gap-6">
          <SkeletonBlock className="h-96" />
          <SkeletonBlock className="h-96" />
          <SkeletonBlock className="h-96" />
        </div>
      </div>
    </main>
  );
}

export function WorldMapSkeleton() {
  return (
    <div className="w-full rounded-xl border border-border bg-card p-4 space-y-3">
      <SkeletonBlock className="h-4 w-28" />
      <SkeletonBlock className="w-full h-48" />
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function ChartsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonBlock className="h-80" />
      <SkeletonBlock className="h-80" />
    </div>
  );
}

export function InnsyniPageSkeleton() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 space-y-16">
      <SkeletonBlock className="h-8 w-32" />
      <section className="space-y-6">
        <SkeletonBlock className="h-48" />
        <SkeletonBlock className="h-72" />
      </section>
      <SkeletonBlock className="h-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonBlock className="h-64" />
        <SkeletonBlock className="h-64" />
      </div>
    </main>
  );
}
