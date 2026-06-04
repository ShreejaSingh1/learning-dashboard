"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

const cardStyles = [
  {
    border: "hover:border-emerald-500/30",
    glow: "rgba(110,231,183,0.12)",
    progress: "from-emerald-400 to-teal-400",
    icon: "bg-emerald-500/10 text-emerald-400",
  },
  {
    border: "hover:border-sky-500/30",
    glow: "rgba(56,189,248,0.12)",
    progress: "from-sky-400 to-blue-400",
    icon: "bg-sky-500/10 text-sky-400",
  },
  {
    border: "hover:border-violet-500/30",
    glow: "rgba(167,139,250,0.12)",
    progress: "from-violet-400 to-purple-400",
    icon: "bg-violet-500/10 text-violet-400",
  },
  {
    border: "hover:border-amber-500/30",
    glow: "rgba(251,191,36,0.12)",
    progress: "from-amber-400 to-orange-400",
    icon: "bg-amber-500/10 text-amber-400",
  },
];

function CourseIcon({ name, className }: { name: string; className?: string }) {
  const formatted = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof LucideIcons;

  const Icon =
    (LucideIcons[formatted] as React.ComponentType<{
      size?: number;
      className?: string;
    }>) ?? LucideIcons.BookOpen;

  return <Icon size={20} className={className} />;
}

function ProgressBar({ value, colorClass }: { value: number; colorClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
        initial={{ width: "0%" }}
        animate={{ width: isVisible ? `${value}%` : "0%" }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

export function CourseCard({ course, index }: CourseCardProps) {
  const style = cardStyles[index % cardStyles.length];

  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative rounded-xl border border-[var(--border)] ${style.border} bg-[var(--surface)] overflow-hidden cursor-pointer transition-colors duration-300`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 120% 120% at 0% 0%, ${style.glow}, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${style.icon}`}>
            <CourseIcon name={course.icon_name} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold text-[var(--text)] leading-snug line-clamp-2">
              {course.title}
            </h3>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5 font-medium">
              In progress
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
              Progress
            </span>
            <span className={`text-[13px] font-bold bg-gradient-to-r ${style.progress} bg-clip-text text-transparent`}>
              {course.progress}%
            </span>
          </div>
          <ProgressBar value={course.progress} colorClass={style.progress} />
        </div>
      </div>
    </motion.article>
  );
}
