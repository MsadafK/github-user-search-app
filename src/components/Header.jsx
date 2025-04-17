import { useContext } from "react";
import IconSun from "../assets/icon-sun-dark.svg";
import { DevFinderContext } from "./DevFinderProvider";
import iconMoon from "../assets/icon-moon.svg";

const Header = () => {
  const { theme, setTheme } = useContext(DevFinderContext);

  return (
    <header className="w-full absolute top-0 p-4 flex justify-between items-center font-space-mono">
      <h1 className="text-2xl font-semibold ">devfinder</h1>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <span className="text-sm font-semibold tracking-[3px]">
          {theme.toUpperCase()}
        </span>
        <img src={theme === "light" ? IconSun : iconMoon} alt="" />
      </div>
    </header>
  );
};

export default Header;
