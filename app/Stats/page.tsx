"use client";
import AuthGuard from "@/app/components/AuthGuard";
import Chart from "../components/chart";
import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
export default function Stats() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const key = `typingSession_${user.uid}`;
        const saved = localStorage.getItem(key);
        const session = saved ? JSON.parse(saved) : [];

        /* ---------- CHART DATA ---------- */
        const data = session.map((s: any) => ({
          name: new Date(s.date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          WPM: s.wpm,
          Accuracy: s.accuracy,
          Error: 100 - s.accuracy,
        }));
        setChartData(data);
      } else {
        setChartData([]);
      }
    });
    return () => unsub();
  }, []);
  return (
    <AuthGuard>
      <div className="mt-6 m-20 text-white p-5 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
        {chartData.length > 0 ? (
          <Chart chartData={chartData} />
        ) : (
          <p>No data yet. Take a typing test to see stats here!</p>
        )}
      </div>
    </AuthGuard>
  );
}
