"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, Trophy, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "progress", label: "Progress", icon: BarChart3, href: "/dashboard/progress" },
  { id: "achievements", label: "Awards", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl"
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.div
                  layoutId="mobile-active"
                  className="absolute inset-0 rounded-xl bg-[var(--surface-2)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 transition-colors duration-150 ${
                  active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium transition-colors duration-150 ${
                  active ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
