"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useMemo } from "react";

const WEEKS = 12;
const TOTAL_DAYS = WEEKS * 7;

const intensityMap = [
  "bg-white/[0.04]",
  "bg-emerald-500/20",
  "bg-emerald-500/40",
  "bg-emerald-500/65",
  "bg-emerald-400/85",
];

function buildActivityData() {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (TOTAL_DAYS - 1 - i));
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const threshold = isWeekend ? 0.3 : 0.65;
    const count = Math.random() < threshold ? Math.floor(Math.random() * 5) : 0;
    return { date: date.toISOString().split("T")[0], count };
  }).map((day, i) => {
    if (i >= TOTAL_DAYS - 14 && Math.random() > 0.4) {
      return { ...day, count: Math.floor(Math.random() * 5) + 1 };
    }
    return day;
  });
}

export function ActivityTile() {
  const data = useMemo(() => buildActivityData(), []);

  const weeks = Array.from({ length: WEEKS }, (_, i) =>
    data.slice(i * 7, i * 7 + 7)
  );

  const totalSessions = data.reduce((acc, d) => acc + d.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;

  return (
    <motion.article
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden h-full"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(110,231,183,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 p-5 flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[var(--accent)]" />
            <h2
              className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest"
              style={{ letterSpacing: "0.1em" }}
            >
              Activity
            </h2>
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">Last 12 weeks</span>
        </div>

        <div className="flex gap-4">
          <div>
            <p
              className="text-xl font-bold text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {totalSessions}
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">Sessions</p>
          </div>
          <div>
            <p
              className="text-xl font-bold text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeDays}
            </p>
            <p className="text-[11px] text-[var(--text-muted)]">Active days</p>
          </div>
        </div>

        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px] flex-1">
              {week.map((day, di) => (
                <motion.div
                  key={`${wi}-${di}`}
                  className={`activity-cell ${intensityMap[Math.min(day.count, 4)]} rounded-[3px]`}
                  style={{ aspectRatio: "1", width: "100%" }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wi * 7 + di) * 0.005,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-auto">
          <span className="text-[10px] text-[var(--text-muted)]">Less</span>
          {intensityMap.map((color, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
          <span className="text-[10px] text-[var(--text-muted)]">More</span>
        </div>
      </div>
    </motion.article>
  );
}
