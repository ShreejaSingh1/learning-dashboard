export function ActivitySkeleton() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col gap-4 h-full min-h-[300px]">
      <div className="flex items-center justify-between">
        <div className="skeleton-shimmer h-3 w-20 rounded-full" />
        <div className="skeleton-shimmer h-3 w-24 rounded-full" />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="skeleton-shimmer h-6 w-8 rounded-md" />
          <div className="skeleton-shimmer h-2.5 w-14 rounded-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="skeleton-shimmer h-6 w-8 rounded-md" />
          <div className="skeleton-shimmer h-2.5 w-16 rounded-full" />
        </div>
      </div>
      <div className="flex gap-[3px] flex-1">
        {Array.from({ length: 12 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] flex-1">
            {Array.from({ length: 7 }).map((_, di) => (
              <div
                key={di}
                className="skeleton-shimmer rounded-sm"
                style={{ aspectRatio: "1", width: "100%" }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-auto">
        <div className="skeleton-shimmer h-2 w-6 rounded-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-shimmer w-3 h-3 rounded-sm" />
        ))}
        <div className="skeleton-shimmer h-2 w-6 rounded-full" />
      </div>
    </div>
  );
}
