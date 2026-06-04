export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 flex items-center gap-3"
        >
          <div className="skeleton-shimmer w-9 h-9 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="skeleton-shimmer h-4 w-10 rounded-full" />
            <div className="skeleton-shimmer h-2.5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
