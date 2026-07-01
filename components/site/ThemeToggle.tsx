"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative grid h-9 w-9 place-items-center rounded-full hairline text-ink transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      {theme === "dark" ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
    </button>
  );
}
