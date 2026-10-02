"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export function ThemeToggle({ className, showLabels = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10", className)} />
    );
  }

  if (showLabels) {
    return (
      <div className={cn("flex items-center gap-1 p-1 rounded-2xl bg-black/5 dark:bg-navy-dark border border-black/10 dark:border-white/10 text-xs font-mono font-semibold", className)}>
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer",
            theme === "light"
              ? "bg-white text-saffron shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer",
            theme === "dark"
              ? "bg-navy-surface text-saffron shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer",
            theme === "system"
              ? "bg-white dark:bg-navy-surface text-saffron shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>System</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:text-saffron transition flex items-center justify-center cursor-pointer",
        className
      )}
      title={`Current: ${theme} mode. Click to switch.`}
      aria-label="Toggle light and dark theme"
    >
      {resolvedTheme === "dark" ? (
        <Moon className="h-4 w-4 text-white" />
      ) : (
        <Sun className="h-4 w-4 text-white" />
      )}
    </button>
  );
}
