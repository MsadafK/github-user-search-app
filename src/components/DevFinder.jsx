import { useContext } from "react";
import { DevFinderContext } from "./DevFinderProvider";

const DevFinder = ({ children }) => {
  const { theme } = useContext(DevFinderContext);

  const textColor = theme === "light" ? "text-charcoal" : "text-almost-white";

  return (
    <div
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-3 py-4 font-space-mono min-[380px]:px-4 min-[380px]:py-5 sm:px-6 lg:px-8 lg:py-7 ${textColor}`}
    >
      {children}
    </div>
  );
};

export default DevFinder;
