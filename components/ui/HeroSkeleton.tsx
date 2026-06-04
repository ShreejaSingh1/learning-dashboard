export function HeroSkeleton() {
  return (
    <div
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden"
      style={{ minHeight: 160 }}
    >
      <div className="flex flex-col gap-3 flex-1">
        <div className="skeleton-shimmer h-3 w-36 rounded-full" />
        <div className="skeleton-shimmer h-10 w-3/4 rounded-xl" />
        <div className="skeleton-shimmer h-3 w-1/2 rounded-full" />
      </div>
      <div className="flex gap-4 shrink-0">
        <div className="skeleton-shimmer w-24 h-24 rounded-xl" />
        <div className="skeleton-shimmer w-24 h-24 rounded-xl" />
      </div>
    </div>
  );
}
