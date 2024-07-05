"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-1 rounded focus:outline-none"
    >
      {theme === "dark" ? (
        <FaSun className="w-6 h-6 text-white-500" />
      ) : (
        <FaMoon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  );
}