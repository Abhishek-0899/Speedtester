"use client";

import { useEffect, useState } from "react";
import TypingText from "./typingtext";

export default function InputBox({
  selectedTime,
  setSelectedTime,
  setWPM,
  setAccuracy,
}) {
  const dataApi = "https://jsonplaceholder.typicode.com/comments";
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedTime);

  // Fetch random text properly inside useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(dataApi);
        const data = await res.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setText(data[randomIndex].body.replace(/\n/g, " "));
      } catch (e) {
        console.error("Error fetching text", e);
      }
    }
    fetchData();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!modalOpen) return;
    const interval = setInterval(
      () => setTimeLeft((t) => Math.max(t - 1, 0)),
      1000
    );
    return () => clearInterval(interval);
  }, [modalOpen]);

  // Auto-close modal when time = 0
  useEffect(() => {
    if (timeLeft === 0) setModalOpen(false);
  }, [timeLeft]);

  const startTest = () => {
    setTimeLeft(selectedTime);
    setModalOpen(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeLeft(time);
  };

  return (
    <div className="relative bg-[#12172a] rounded-2xl p-6 shadow-lg">
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0d111f] rounded-2xl p-8 w-full max-w-3xl shadow-2xl border border-purple-600">
            <TypingText
              text={text}
              disabled={timeLeft === 0}
              onComplete={(typedWords, totalWords) => {
                const WPMCalc = Math.round((typedWords / selectedTime) * 60); // ✅ fix here
                const accuracyCalc = Math.round(
                  (typedWords / totalWords) * 100
                );
                setWPM(WPMCalc);
                setAccuracy(accuracyCalc);

                // Fetch new text
                async function fetchData() {
                  try {
                    const res = await fetch(dataApi);
                    const data = await res.json();
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setText(data[randomIndex].body.replace(/\n/g, " "));
                  } catch (e) {
                    console.error("Error fetching text", e);
                  }
                }
                fetchData();
              }}
            />

            {/* Footer Controls */}
            <div className="mt-6 flex justify-between items-center text-gray-300">
              <span className="text-xl font-semibold">⏱ {timeLeft}s</span>
              <span className="text-lg font-medium">Difficulty: Medium</span>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {[20, 30, 60].map((time) => (
          <button
            key={time}
            onClick={() => handleTimeSelect(time)}
            className={`px-5 py-2 rounded-xl transition font-semibold ${
              selectedTime === time
                ? "bg-purple-600 text-white shadow-md"
                : "bg-blue-800 hover:bg-blue-950"
            }`}
          >
            {time}s
          </button>
        ))}

        <button
          onClick={startTest}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition text-white font-bold shadow-lg"
        >
          <img
            width="22"
            height="22"
            src="https://img.icons8.com/color/48/text-cursor.png"
            alt="cursor"
          />
          Start Typing
        </button>
      </div>

      <div className="mt-4 text-center text-gray-400 text-sm">
        Select a time and start your typing test!
      </div>
    </div>
  );
}
