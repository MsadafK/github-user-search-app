import { useContext } from "react";
import DevFinder from "./components/DevFinder";
import Header from "./components/Header";
import Main from "./components/Main";
import { DevFinderContext } from "./components/DevFinderProvider";

const App = () => {
  const { theme } = useContext(DevFinderContext);

  const bgColor = theme === "light" ? "bg-very-light-gray" : "bg-dark-navy";

  return (
    <div className={`${bgColor} min-h-screen flex  items-center justify-center`}>
      <DevFinder>
        <Header />
        <Main />
      </DevFinder>
    </div>
  );
};

export default App;
