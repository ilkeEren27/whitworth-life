"use client";

import { useEffect, useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "../ui/toggle";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const applyTheme = useCallback((dark) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const dark = stored ? stored === "dark" : prefersDark;
      setIsDark(dark);
      applyTheme(dark);
    } catch {
      setIsDark(false);
    } finally {
      setMounted(true);
    }
  }, [applyTheme]);

  const onPressedChange = (pressed) => {
    setIsDark(pressed);
    applyTheme(pressed);
  };

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => onPressedChange(!isDark)}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
    >
      {isDark ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-accent" />}
    </button>
  );
}
