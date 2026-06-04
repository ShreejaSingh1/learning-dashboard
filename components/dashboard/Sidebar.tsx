"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "progress", label: "Progress", icon: BarChart3, href: "/dashboard/progress" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

function useTabletBreakpoint() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    setIsTablet(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isTablet;
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pathname = usePathname();
  const isTablet = useTabletBreakpoint();

  const isCollapsed = isTablet ? true : collapsed;

  return (
    <motion.nav
      animate={{ width: isCollapsed ? 68 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col shrink-0 h-full border-r border-[var(--border)] bg-[var(--surface)] relative z-10 overflow-hidden"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border)] min-h-[68px]">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Zap size={16} className="text-black" strokeWidth={2.5} />
        </div>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-bold text-[15px] tracking-tight text-[var(--text)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-1 p-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 group"
              aria-current={active ? "page" : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-lg bg-[var(--surface-2)] border border-white/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {hoveredId === item.id && !active && (
                <motion.div
                  layoutId="sidebar-hover-bg"
                  className="absolute inset-0 rounded-lg bg-white/[0.03]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                size={18}
                className={`shrink-0 relative z-10 transition-colors duration-150 ${
                  active
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                }`}
              />

              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`text-[13px] font-medium relative z-10 whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? "text-[var(--text)]"
                        : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {active && isCollapsed && (
                <motion.div
                  layoutId="sidebar-active-dot"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {!isTablet && (
        <div className="p-3 border-t border-[var(--border)]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-white/[0.04] transition-all duration-150"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <ChevronLeft size={16} />
            </motion.div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  key="collapse-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[12px] font-medium"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      )}
    </motion.nav>
  );
}
