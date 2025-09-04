"use client";

import { createContext, useEffect, useState } from "react";

type contextType = {
  theme: string;
  toggle: () => void;
};

const initialState: contextType = {
  theme: "light",
  toggle: () => {},
};

export const ThemeContext = createContext<contextType>(initialState);

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage() || "light";
  });
  const [mounted, setMounted] = useState(false);

  const toggle = () => {
    console.log("toggle");
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme!);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme}>{children}</div>;
    </ThemeContext.Provider>
  );
};
