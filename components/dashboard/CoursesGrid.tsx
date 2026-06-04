import { getCourses } from "@/lib/data";
import { CourseCard } from "./CourseCard";
import { ErrorTile } from "@/components/ui/ErrorTile";

export async function CoursesGrid() {
  let courses;

  try {
    courses = await getCourses();
  } catch {
    return (
      <ErrorTile message="Could not connect to the database. Please check your configuration." />
    );
  }

  if (!courses.length) {
    return <ErrorTile message="No courses found. Add some rows in your Supabase table." />;
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <h2
          className="text-sm font-semibold text-[var(--text-muted)] uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          Active Courses
        </h2>
        <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-2)] border border-[var(--border)] px-2 py-1 rounded-full">
          {courses.length} enrolled
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {courses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}
