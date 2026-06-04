import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CoursesGrid } from "@/components/dashboard/CoursesGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CoursesSkeleton } from "@/components/ui/CoursesSkeleton";
import { BentoGrid, BentoCell } from "@/components/dashboard/BentoGrid";
import { StatsRow } from "@/components/dashboard/StatsRow";

export default function DashboardPage() {
  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <BentoGrid>
        <BentoCell className="col-span-12">
          <HeroTile />
        </BentoCell>

        <BentoCell className="col-span-12">
          <StatsRow />
        </BentoCell>

        <BentoCell className="col-span-12 lg:col-span-8">
          <Suspense fallback={<CoursesSkeleton />}>
            <CoursesGrid />
          </Suspense>
        </BentoCell>

        <BentoCell className="col-span-12 lg:col-span-4 min-h-[300px]">
          <ActivityTile />
        </BentoCell>
      </BentoGrid>
    </section>
  );
}
