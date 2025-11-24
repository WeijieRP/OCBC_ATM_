import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

import CustomApp from "./modes/custom/App";
import ElderlyApp from "./modes/elderly/elderlyapp";
import KidsApp from "./modes/kids/kidsapp";

function ModeRouter() {
const [mode, setMode] = useState("custom"); // default
const [loading, setLoading] = useState(true);

useEffect(() => {
const modeRef = ref(db, "atmConfig/mode");

const unsubscribe = onValue(
    modeRef,
    (snapshot) => {
    if (snapshot.exists()) {
        const value = snapshot.val();
        // Expecting: "custom" | "kids" | "elderly"
        if (value === "kids" || value === "elderly" || value === "custom") {
        setMode(value);
        } else {
        setMode("custom"); // fallback
        }
    } else {
        setMode("custom"); // fallback
    }
    setLoading(false);
    },
    (error) => {
    console.error("Error reading mode from Firebase:", error);
    setMode("custom");
    setLoading(false);
    }
);

return () => unsubscribe();
}, []);

if (loading) {
return (
    <div className="atm-root atm-root--light atm-root--font-md atm-loading">
    <div className="atm-frame">
        <div className="atm-loading-card">
        <div className="atm-spinner-coin" />
        <p>Connecting to ATM services…</p>
        </div>
    </div>
    </div>
);
}

if (mode === "elderly") {
return <ElderlyApp />;
}

if (mode === "kids") {
return <KidsApp />;
}

return <CustomApp />;
}

export default ModeRouter;
