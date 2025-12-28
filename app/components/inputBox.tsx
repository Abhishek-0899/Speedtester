"use client";

import { useEffect, useRef, useState } from "react";
import TypingText from "./typingtext";
import Chart from "./chart";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function InputBox({
  selectedTime,
  setSelectedTime,
  setWPM,
  setAccuracy,
}) {
  const API = "https://jsonplaceholder.typicode.com/comments";

  // ---------- CURRENT USER ----------
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsub();
  }, []);

  // ---------- SESSION ----------
  const [session, setSession] = useState([]);

  // Load session for current user
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`typingSession_${user.uid}`);
    setSession(saved ? JSON.parse(saved) : []);
  }, [user]);

  // Save session for current user
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`typingSession_${user.uid}`, JSON.stringify(session));
  }, [session, user]);

  // ---------- RANDOM TEXT ----------
  const [text, setText] = useState("");
  const loadText = async () => {
    const res = await fetch(API);
    const data = await res.json();
    const random = Math.floor(Math.random() * data.length);
    setText(data[random].body.replace(/\n/g, " "));
  };
  useEffect(() => {
    loadText();
  }, []);

  // ---------- TIMER ----------
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    if (!modalOpen) return;
    const interval = setInterval(() => setTimeLeft((t) => Math.max(t - 1, 0)), 1000);
    return () => clearInterval(interval);
  }, [modalOpen]);

  // ---------- TEST STATE ----------
  const wpmRef = useRef(0);
  const accuracyRef = useRef(0);
  const testStartedRef = useRef(false);

  useEffect(() => {
    if (timeLeft !== 0 || !testStartedRef.current) return;
    finishTest();
  }, [timeLeft]);

  // ---------- START / FINISH TEST ----------
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

  const finishTest = () => {
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
  };

  // ---------- CHART DATA ----------
  const chartData = session.map((s) => ({
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

  // ---------- RENDER ----------
  return (
    <div>
      <div className="relative bg-[#12172a] rounded-2xl p-6 shadow-lg">
        {/* MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0d111f] rounded-2xl p-8 w-full max-w-3xl border border-purple-600">
              <TypingText
                text={text}
                disabled={timeLeft === 0}
                onTyping={(typedWords, totalWords) => {
                  const wpm = Math.round((typedWords / selectedTime) * 60);
                  const acc = Math.round((typedWords / totalWords) * 100);

                  wpmRef.current = wpm;
                  accuracyRef.current = acc;

                  setWPM(wpm);
                  setAccuracy(acc);
                }}
                onComplete={loadText}
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

        {/* TIME BUTTONS */}
        <div className="flex justify-center gap-4 mt-4">
          {[20, 30, 60].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`px-5 py-2 rounded-xl ${
                selectedTime === t ? "bg-purple-600 text-white" : "bg-blue-800"
              }`}
            >
              {t}s
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

      {/* CHART */}
      {chartData.length > 0 ? (
        <Chart chartData={chartData} />
      ) : (
        <p className="text-center mt-4 text-gray-300">
          No Data yet. Take a typing test!
        </p>
      )}
    </div>
  );
}
