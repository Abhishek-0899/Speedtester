"use client";

import { useEffect, useState } from "react";

export default function Summarize() {
  const [summary, setSummary] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("typingSession_")
    );

    if (!sessionKeys.length) {
      setSummary(["⚠️ No typing data found. Please complete a test first"]);
      setLoading(false);
      return;
    }

    let latestSession: any = null;

    for (const key of sessionKeys) {
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(data) && data.length > 0) {
        latestSession = data[data.length - 1];
      }
    }

    if (!latestSession) {
      setSummary(["⚠️ No typing data found. Please complete a test first"]);
      setLoading(false);
      return;
    }

    const generateLongBulletSummary = () => {
      const emojis = ["✅", "⚡", "🚀", "⚠️", "🎯", "💡", "🐢"];
      const suggestions = [
        "Focus on consistency and accuracy during practice sessions",
        "Challenge yourself with higher difficulty exercises gradually",
        "Maintain proper posture and finger placement to improve speed",
        "Regular practice will help reduce errors and increase confidence",
        "Small, focused improvements each day lead to mastery over time",
        "Try practicing under timed conditions to simulate real tests",
        "Analyze which keys cause frequent mistakes and focus on them"
      ];

      const bullets: string[] = [];
      const pickRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
      const numBullets = Math.floor(Math.random() * 4) + 7; // 7 to 10 bullets

      for (let i = 0; i < numBullets; i++) {
        const emoji = pickRandom(emojis);
        const category = pickRandom(["Accuracy", "Speed", "Errors", "Difficulty", "Overall"]);
        let text = "";

        if (category === "Accuracy") {
          text += `Your accuracy was ${latestSession.accuracy}% `;
          if (latestSession.accuracy >= 95) text += "Outstanding precision throughout the session ";
          else if (latestSession.accuracy >= 85) text += "Good accuracy, with minor errors that can be improved ";
          else text += "Accuracy could be improved; focus on avoiding mistakes ";
        } else if (category === "Speed") {
          text += `Typing speed reached ${latestSession.wpm} WPM `;
          if (latestSession.wpm >= 80) text += "Excellent pace, showing strong typing proficiency ";
          else if (latestSession.wpm >= 50) text += "Moderate speed, steady but can be increased ";
          else text += "Speed is on the lower side; consistent practice is recommended ";
        } else if (category === "Errors") {
          text += latestSession.errors && latestSession.errors > 0
            ? `You made ${latestSession.errors} errors during this session `
            : "No errors detected, excellent control ";
          text += "Pay attention to common mistakes to improve further ";
        } else if (category === "Difficulty") {
          text += `Session difficulty was ${latestSession.difficulty || "Easy"} `;
          text += "Adjusting difficulty gradually can help you improve effectively ";
        } else if (category === "Overall") {
          text += "Overall, your typing performance shows steady improvement ";
          text += "Focusing on weak areas while maintaining strengths will enhance your skills ";
        }

        text += pickRandom(suggestions); // add improvement suggestion
        bullets.push(`${emoji} ${text}`);
      }

      return bullets;
    };

    setTimeout(() => {
      setSummary(generateLongBulletSummary());
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-full text-[20px] mx-auto mt-12 p-6 rounded-2xl bg-[#12172a] text-white shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">AI Performance Summary</h1>

      {loading ? (
        <p className="text-gray-400">Analyzing your typing performance…</p>
      ) : (
        <ul className="list-disc list-inside text-gray-200 space-y-3">
          {summary.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
