import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; 
import { ref, onValue } from "firebase/database";

function KidsSavingsGoal({ goTo }) {
const [goalName, setGoalName] = useState("");
const [goalAmount, setGoalAmount] = useState(0);
const [currentSaved, setCurrentSaved] = useState(0);
const [loading, setLoading] = useState(true);

useEffect(() => {
const goalRef = ref(db, "kids/savingsGoal");

const unsubscribe = onValue(goalRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
    setGoalName(data.goalName);
    setGoalAmount(data.goalAmount);
    setCurrentSaved(data.currentSaved);
    }
    setLoading(false);
});

return () => unsubscribe();
}, []);

if (loading) {
return (
    <main className="atm-main kids-savings-main">
    <div className="atm-card atm-screen-contents kids-savings-card center">
        <p>Loading goal…</p>
    </div>
    </main>
);
}

const progress = Math.min(100, Math.round((currentSaved / goalAmount) * 100));

return (
<main className="atm-main kids-savings-main">
    <div className="atm-card atm-screen-contents kids-savings-card">
    <button
        className="atm-back-btn"
        onClick={() => goTo("mainMenu")}
        aria-label="Back"
    >
        ←
    </button>

    <h2 className="atm-card-title center">My Savings Goal</h2>
    <p className="atm-subtitle center">
        You're saving for: <strong>{goalName}</strong>
    </p>

    <div className="kids-progress-wrapper">
        <div className="kids-progress-bar">
        <div
            className="kids-progress-inner"
            style={{ width: `${progress}%` }}
        />
        </div>
        <p className="kids-progress-text center">
        ${currentSaved} / ${goalAmount} ({progress}%)
        </p>
    </div>

    <p className="atm-helper-text center">
        You can update this goal from the mobile app.
    </p>
    </div>
</main>
);
}

export default KidsSavingsGoal;
