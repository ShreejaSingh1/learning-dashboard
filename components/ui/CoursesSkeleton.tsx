function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="skeleton-shimmer w-10 h-10 rounded-xl shrink-0" />
        <div className="flex-1 flex flex-col gap-2 pt-0.5">
          <div className="skeleton-shimmer h-3.5 w-full rounded-full" />
          <div className="skeleton-shimmer h-3.5 w-2/3 rounded-full" />
          <div className="skeleton-shimmer h-2.5 w-16 rounded-full mt-0.5" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="skeleton-shimmer h-2.5 w-14 rounded-full" />
          <div className="skeleton-shimmer h-2.5 w-8 rounded-full" />
        </div>
        <div className="skeleton-shimmer h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CoursesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-3 w-28 rounded-full" />
        <div className="skeleton-shimmer h-5 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
