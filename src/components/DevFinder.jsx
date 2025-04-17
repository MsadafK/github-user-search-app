import { useContext } from "react";
import { DevFinderContext } from "./DevFinderProvider";

const DevFinder = ({ children }) => {
  const { theme } = useContext(DevFinderContext);

  const bgColor = theme === "light" ? "bg-bg-very-light-gray" : "bg-dark-navy";
  const textColor = theme === "light" ? "text-dark-navy" : "text-almost-white";

  return (
    <div
      className={`pt-16 flex flex-col items-center justify-center gap-8 relative font-space-mono max-w-[425px] mx-auto lg:max-w-[500px] lg:my-[2.75%] xl:max-w-[600px] xl:my-[2.5%] ${bgColor} ${textColor}`}
    >
      {children}
    </div>
  );
};

export default DevFinder;
