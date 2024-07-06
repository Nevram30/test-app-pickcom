"use client";

import { RiMoonFill, RiSunFill } from "@remixicon/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? (
        <RiSunFill className="text-foreground-700 h-6 w-6" />
      ) : (
        <RiMoonFill className="text-foreground-700 h-6 w-6" />
      )}
    </button>
  );
}
