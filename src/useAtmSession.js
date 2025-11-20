// src/useAtmSession.js
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue, set, update } from "firebase/database";

export function useAtmSession(sessionId = "demoSession") {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe to changes (optional but nice for debugging / sync)
  useEffect(() => {
    const sessionRef = ref(db, `atmSessions/${sessionId}`);

    const unsubscribe = onValue(
      sessionRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setSession(snapshot.val());
        } else {
          setSession(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error loading ATM session:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  const safeUpdate = (data) => {
    const sessionRef = ref(db, `atmSessions/${sessionId}`);
    return update(sessionRef, {
      ...data,
      updatedAt: Date.now(),
    }).catch((err) => {
      console.error("Error updating ATM session:", err);
      setError(err);
    });
  };

  const setAuthenticated = (value) => {
    return safeUpdate({ authenticated: !!value });
  };

  const setCurrentScreen = (screen) => {
    if (!screen) return;
    return safeUpdate({ currentScreen: screen });
  };

  const resetSession = () => {
    const sessionRef = ref(db, `atmSessions/${sessionId}`);
    return set(sessionRef, {
      authenticated: false,
      currentScreen: "insertCard",
      updatedAt: Date.now(),
    }).catch((err) => {
      console.error("Error resetting ATM session:", err);
      setError(err);
    });
  };

  return {
    session,
    loading,
    error,
    setAuthenticated,
    setCurrentScreen,
    resetSession,
  };
}
