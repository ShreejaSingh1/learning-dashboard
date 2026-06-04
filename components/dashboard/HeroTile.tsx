"use client";

import { motion } from "framer-motion";
import { Flame, Calendar, Clock } from "lucide-react";

const studentName = "Alex";
const streakDays = 14;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroTile() {
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      whileHover={{
        scale: 1.005,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-2xl overflow-hidden border border-[var(--border)] gradient-mesh"
      style={{ minHeight: 160 }}
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-[var(--accent-2)] opacity-[0.05] blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-[var(--text-muted)] text-sm font-medium flex items-center gap-2">
            <Calendar size={13} />
            {today}
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {greeting},{" "}
            <span className="gradient-text-green">{studentName}</span> 👋
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">
            You have{" "}
            <span className="text-[var(--accent)] font-semibold">3 lessons</span>{" "}
            scheduled today. Keep the momentum going!
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-center gap-1 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-5 py-4">
            <div className="flame-glow">
              <Flame size={28} className="text-orange-400" fill="currentColor" />
            </div>
            <span
              className="text-3xl font-bold text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {streakDays}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
              Day Streak
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-5 py-4">
            <Clock size={28} className="text-[var(--accent-2)]" />
            <span
              className="text-3xl font-bold text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              2.4
            </span>
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
              Hrs Today
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
