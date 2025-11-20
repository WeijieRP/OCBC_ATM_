// src/useAtmPreferences.js
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

const DEFAULT_PREFS = {
  overseasBlocked: false,
  timeoutSpeed: "normal",   // "slow" | "normal" | "fast"
  fontSize: "normal",       // "normal" | "large" | "xlarge"
  fontColour: "default",    // "default" | "highContrast"
  defaultLanguage: "EN",    // "EN" | "ZH" | "MS" | "TA"
};

export function useAtmPreferences() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const prefsRef = ref(db, "atmConfig/preferences");

    const unsubscribe = onValue(
      prefsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val() || {};
          setPrefs({
            overseasBlocked:
              val.overseasBlocked === undefined
                ? DEFAULT_PREFS.overseasBlocked
                : !!val.overseasBlocked,
            timeoutSpeed: val.timeoutSpeed || DEFAULT_PREFS.timeoutSpeed,
            fontSize: val.fontSize || DEFAULT_PREFS.fontSize,
            fontColour: val.fontColour || DEFAULT_PREFS.fontColour,
            defaultLanguage:
              val.defaultLanguage || DEFAULT_PREFS.defaultLanguage,
          });
        } else {
          setPrefs(DEFAULT_PREFS);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error loading ATM preferences:", err);
        setError(err);
        setPrefs(DEFAULT_PREFS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { prefs, loading, error };
}
