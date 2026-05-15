import { useContext } from "react";
import IconSun from "../assets/icon-sun-dark.svg";
import { DevFinderContext } from "./DevFinderProvider";
import iconMoon from "../assets/icon-moon.svg";

const Header = () => {
  const { theme, setTheme } = useContext(DevFinderContext);
  const isLight = theme === "light";

  return (
    <header className="float-in flex w-full flex-wrap items-center justify-between gap-3 border-b border-[#272018]/10 pb-4 dark:border-white/10">
      <div className="flex min-w-0 items-center gap-3 min-[380px]:gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-base font-bold min-[380px]:h-12 min-[380px]:w-12 min-[380px]:text-lg ${
            isLight
              ? "border-[#d8d0c2] bg-[#fffaf1] text-[#1f6f5b]"
              : "border-white/10 bg-white/[0.04] text-[#8fb9a8]"
          }`}
        >
          df
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-normal min-[380px]:text-2xl sm:text-3xl">
            DevFinder
          </h1>
          <p
            className={`max-w-[170px] truncate text-[10px] font-bold uppercase tracking-[0.12em] min-[380px]:max-w-none min-[380px]:text-xs min-[380px]:tracking-[0.18em] ${
              isLight ? "text-[#756d62]" : "text-[#969696]"
            }`}
          >
            GitHub profile review desk
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        className={`flex h-10 items-center gap-2 rounded-full border px-3 text-[11px] font-bold uppercase tracking-[0.12em] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#1f6f5b] focus:ring-offset-2 min-[380px]:h-11 min-[380px]:gap-3 min-[380px]:px-4 min-[380px]:text-xs min-[380px]:tracking-[0.16em] ${
          isLight
            ? "border-[#d8d0c2] bg-[#fffaf1] text-[#4d463f] focus:ring-offset-[#f4f1ea]"
            : "border-white/10 bg-white/[0.04] text-[#f4f1ea] focus:ring-offset-[#111111]"
        }`}
        onClick={() => setTheme(isLight ? "dark" : "light")}
      >
        <span>{isLight ? "Dark" : "Light"}</span>
        <img
          src={isLight ? iconMoon : IconSun}
          alt=""
          className="h-4 w-4"
        />
      </button>
    </header>
  );
};

export default Header;
