import React from "react";

function KidsSavingsGoal({ goTo }) {
// Later: read actual savings goal from Firebase
const goalName = "New game";
const goalAmount = 200;
const currentSaved = 80;

const progress = Math.min(
100,
Math.round((currentSaved / goalAmount) * 100)
);

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

    <div className="atm-card-footer center">
    </div>
    </div>
</main>
);
}

export default KidsSavingsGoal;
