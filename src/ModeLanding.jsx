import React, { useState } from "react";
import CustomApp from "./modes/custom/App";
import ElderlyApp from "./modes/elderly/elderlyapp";
import KidsApp from "./modes/kids/kidsapp";

export default function ModeLanding() {
const [mode, setMode] = useState(null);

// Once mode is selected → show the real ATM app
if (mode === "custom") return <CustomApp />;
if (mode === "elderly") return <ElderlyApp />;
if (mode === "kids") return <KidsApp />;

// Otherwise show landing
return (
<div className="landing-screen">
    <h1>Select ATM Mode</h1>

    <div className="landing-buttons">
    <button onClick={() => setMode("custom")} className="landing-btn">
        Custom Mode
    </button>

    <button onClick={() => setMode("elderly")} className="landing-btn">
        Elderly Mode
    </button>

    <button onClick={() => setMode("kids")} className="landing-btn">
        Kids Mode
    </button>
    </div>
</div>
);
}
