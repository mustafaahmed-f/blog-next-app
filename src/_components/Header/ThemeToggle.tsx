"use client";
import { ThemeContext } from "@/_context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import styles from "./themeToggle.module.css";

interface ThemeToggleProps {}

function ThemeToggle({}: ThemeToggleProps) {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Moon size={14} color="yellow" />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <Sun size={14} />
    </div>
  );
}

export default ThemeToggle;
