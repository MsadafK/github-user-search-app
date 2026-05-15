import { useContext } from "react";
import DevFinder from "./components/DevFinder";
import Header from "./components/Header";
import Main from "./components/Main";
import { DevFinderContext } from "./components/DevFinderProvider";

const App = () => {
  const { theme } = useContext(DevFinderContext);

  const bgColor =
    theme === "light"
      ? "bg-[#f4f1ea]"
      : "bg-[#111111]";

  return (
    <div className={`${bgColor} relative min-h-screen overflow-hidden text-charcoal transition-colors`}>
      <div className="paper-texture pointer-events-none fixed inset-0 z-0 opacity-70 dark:opacity-20" />
      <div className="relative z-10">
        <DevFinder>
          <Header />
          <Main />
        </DevFinder>
      </div>
    </div>
  );
};

export default App;
