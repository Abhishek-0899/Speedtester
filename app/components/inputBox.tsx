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

  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [session, setSession] = useState([]);

  const wpmRef = useRef(0);
  const accuracyRef = useRef(0);

  // Fetch random text
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(dataApi);
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setText(data[randomIndex].body.replace(/\n/g, " "));
    }
    fetchData();
  }, []);

  // Timer
  useEffect(() => {
    if (!modalOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [modalOpen]);

  // Save session ONLY when test ends
  useEffect(() => {
    if (timeLeft !== 0) return;

    setModalOpen(false);

    setSession((prev) => [
      ...prev,
      {
        wpm: wpmRef.current,
        accuracy: accuracyRef.current,
        date : new Date()
      },
    ]);
  }, [timeLeft]);

  // Data for chart
  const chartData = session.map((val, index) => ({
    name: `Test ${index + 1}`,
    WPM: val.wpm,
    Accuracy: val.accuracy,
  }));

  const startTest = () => {
    setTimeLeft(selectedTime);
    setModalOpen(true);
    setWPM(0);
    setAccuracy(0);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTimeLeft(time);
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
                  const wpmCalc = Math.round((typedWords / selectedTime) * 60);
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
              onClick={() => handleTimeSelect(time)}
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
      {/* Chart */}
      <Chart chartData={chartData} />{" "}
    </div>
  );
}
