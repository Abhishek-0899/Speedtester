"use client";

import { useEffect, useState, useRef } from "react";
import TypingText from "./typingtext";
import Chart from "./chart";

export default function InputBox({
  selectedTime,
  setSelectedTime,
  setWPM,
  setAccuracy,
}) {
  const dataApi = "https://jsonplaceholder.typicode.com/comments";

  /* ---------- LOAD SESSION SAFELY ---------- */
  const [session, setSession] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("typingSession");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedTime);

  const wpmRef = useRef(0);
  const accuracyRef = useRef(0);
  const testStartedRef = useRef(false);

  /* ---------- SAVE SESSION ---------- */
  useEffect(() => {
    localStorage.setItem("typingSession", JSON.stringify(session));
  }, [session]);

  /* ---------- FETCH TEXT ---------- */
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(dataApi);
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setText(data[randomIndex].body.replace(/\n/g, " "));
    }
    fetchData();
  }, []);

  /* ---------- TIMER ---------- */
  useEffect(() => {
    if (!modalOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [modalOpen]);

  /* ---------- SAVE TEST ON END ---------- */
  useEffect(() => {
    if (timeLeft !== 0) return;
    if (!testStartedRef.current) return;

    setModalOpen(false);
    testStartedRef.current = false;

    setSession((prev) => [
      ...prev,
      {
        wpm: wpmRef.current,
        accuracy: accuracyRef.current,
        date: new Date().toISOString(),
      },
    ]);
  }, [timeLeft]);

  /* ---------- CHART DATA ---------- */
  const chartData = session.map((val) => ({
    name: new Date(val.date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
    WPM: val.wpm,
    Accuracy: val.accuracy,
    Error: 100 - val.accuracy,
  }));

  /* ---------- ACTIONS ---------- */
  const startTest = () => {
    if (!selectedTime) return;

    setTimeLeft(selectedTime);
    setModalOpen(true);
    testStartedRef.current = true;

    wpmRef.current = 0;
    accuracyRef.current = 0;

    setWPM(0);
    setAccuracy(0);
  };

  return (
    <div>
      <div className="relative bg-[#12172a] rounded-2xl p-6 shadow-lg">

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0d111f] rounded-2xl p-8 w-full max-w-3xl border border-purple-600">
              <TypingText
                text={text}
                disabled={timeLeft === 0}
                onTyping={(typedWords, totalWords) => {
                  const wpmCalc = Math.round(
                    (typedWords / selectedTime) * 60
                  );
                  const accuracyCalc = Math.round(
                    (typedWords / totalWords) * 100
                  );

                  wpmRef.current = wpmCalc;
                  accuracyRef.current = accuracyCalc;

                  setWPM(wpmCalc);
                  setAccuracy(accuracyCalc);
                }}
              />

              <div className="mt-6 flex justify-between text-gray-300">
                <span className="text-xl">⏱ {timeLeft}s</span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          {[20, 30, 60].map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-5 py-2 rounded-xl ${
                selectedTime === time
                  ? "bg-purple-600 text-white"
                  : "bg-blue-800"
              }`}
            >
              {time}s
            </button>
          ))}

          <button
            onClick={startTest}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            Start Typing
          </button>
        </div>
      </div>

      <Chart chartData={chartData} />
    </div>
  );
}
