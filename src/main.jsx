import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DevFinderProvider from "./components/DevFinderProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DevFinderProvider>
      <App />
    </DevFinderProvider>
  </StrictMode>
);
