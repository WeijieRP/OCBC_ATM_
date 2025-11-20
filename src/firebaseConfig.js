// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// 🔐 Use the SAME config as your mobile app
const firebaseConfig = {
  databaseURL:
    "https://realtime-sync-demo-1d8f2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyC9wqK_YB9MoWkk2212djp63FSkoqyEw6o",
  authDomain: "realtime-sync-demo-1d8f2.firebaseapp.com",
  projectId: "realtime-sync-demo-1d8f2",
  storageBucket: "realtime-sync-demo-1d8f2.firebasestorage.app",
  messagingSenderId: "1082116993500",
  appId: "1:1082116993500:web:6737b72fdcb09d8ad95f19",
  measurementId: "G-T44415WKV1",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
