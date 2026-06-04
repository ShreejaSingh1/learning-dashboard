"use client";

import { motion } from "framer-motion";
import { BookMarked, Star, Target, Award } from "lucide-react";

const stats = [
  { label: "Courses Active", value: "4", icon: BookMarked, color: "text-emerald-400", bg: "rgba(110,231,183,0.1)" },
  { label: "Avg Score", value: "91%", icon: Star, color: "text-amber-400", bg: "rgba(251,191,36,0.1)" },
  { label: "Goals Met", value: "12", icon: Target, color: "text-sky-400", bg: "rgba(56,189,248,0.1)" },
  { label: "Certificates", value: "3", icon: Award, color: "text-violet-400", bg: "rgba(167,139,250,0.1)" },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 flex items-center gap-3 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 80% at 0% 50%, ${stat.bg}, transparent)`,
              }}
            />
            <div
              className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center relative z-10"
              style={{ background: stat.bg }}
            >
              <Icon size={18} className={stat.color} />
            </div>
            <div className="relative z-10">
              <p
                className="text-xl font-bold text-[var(--text)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
