"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "classic" | "dark" | "light";

interface ContextValues {
  theme: Theme;
  setTheme: Dispatch<React.SetStateAction<Theme>>;
  handleToggleSkin: (skin: Theme) => void;
}

export const ThemeContext = createContext<ContextValues | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("classic");

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme");
    if (themeSaved) {
      try {
        const parsedTheme = JSON.parse(themeSaved) as Theme;
        setTheme(parsedTheme);
      } catch (e) {
        console.error("Error parsing theme from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const handleToggleSkin = (skin: Theme) => {
    setTheme(skin);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, handleToggleSkin }}>
      {children}
    </ThemeContext.Provider>
  );
};
