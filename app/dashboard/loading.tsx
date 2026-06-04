import { HeroSkeleton } from "@/components/ui/HeroSkeleton";
import { CoursesSkeleton } from "@/components/ui/CoursesSkeleton";
import { StatsSkeleton } from "@/components/ui/StatsSkeleton";
import { ActivitySkeleton } from "@/components/ui/ActivitySkeleton";

export default function Loading() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <HeroSkeleton />
        </div>
        <div className="col-span-12">
          <StatsSkeleton />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <CoursesSkeleton />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ActivitySkeleton />
        </div>
      </div>
    </section>
  );
}
