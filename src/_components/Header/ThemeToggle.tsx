"use client";
import { ThemeContext } from "@/_context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

interface ThemeToggleProps {}

function ThemeToggle({}: ThemeToggleProps) {
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div
      onClick={toggle}
      className="
      w-[40px] h-[20px] rounded-[50px] cursor-pointer 
      flex items-center justify-between relative px-1 border
    "
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Moon size={14} color="#FFF" />
      <div
        className="w-[15px] h-[15px] rounded-full absolute"
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
