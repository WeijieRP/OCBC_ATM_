import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import CustomApp from "./modes/custom/App";
import ElderlyApp from "./modes/elderly/elderlyapp";
import KidsApp from "./modes/kids/kidsapp";

function LandingScreen({ onSelect }) {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Select ATM Mode</h1>

      <div className="landing-buttons">
        <button className="landing-btn" onClick={() => onSelect("custom")}>
          Custom Mode
        </button>

        <button className="landing-btn" onClick={() => onSelect("elderly")}>
          Elderly Mode
        </button>

        <button className="landing-btn" onClick={() => onSelect("kids")}>
          Kids Mode
        </button>
      </div>
    </div>
  );
}

function ModeRouter() {
  const [selectedMode, setSelectedMode] = useState(null);

  if (!selectedMode) {
    return <LandingScreen onSelect={setSelectedMode} />;
  }

  if (selectedMode === "elderly") return <ElderlyApp />;
  if (selectedMode === "kids") return <KidsApp />;
  return <CustomApp />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModeRouter />
  </React.StrictMode>
);
