// src/useAtmFeatures.js
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

const DEFAULT_FEATURES = {
  depositCash: false,
  withdrawCash: false,
  accountBalance: true, // default visible
  changePin: true,      // default visible
};

export function useAtmFeatures() {
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const featuresRef = ref(db, "atmConfig/mainMenu");

    const unsubscribe = onValue(
      featuresRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val() || {};
          setFeatures({
            depositCash:
              val.depositCash === undefined
                ? DEFAULT_FEATURES.depositCash
                : !!val.depositCash,
            withdrawCash:
              val.withdrawCash === undefined
                ? DEFAULT_FEATURES.withdrawCash
                : !!val.withdrawCash,
            accountBalance:
              val.accountBalance === undefined
                ? DEFAULT_FEATURES.accountBalance
                : !!val.accountBalance,
            changePin:
              val.changePin === undefined
                ? DEFAULT_FEATURES.changePin
                : !!val.changePin,
          });
        } else {
          setFeatures(DEFAULT_FEATURES);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error loading ATM features:", err);
        setError(err);
        setFeatures(DEFAULT_FEATURES);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { features, loading, error };
}
