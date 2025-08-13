import { ThemeContext } from "@/_context/ThemeContext";
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
      flex items-center justify-between relative
    "
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="" width={14} height={14} />
      <div
        className="w-[15px] h-[15px] rounded-full absolute"
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="" width={14} height={14} />
    </div>
  );
}

export default ThemeToggle;
