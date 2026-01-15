"use client";
import { useEffect, useRef, useState } from "react";
import TypingText from "./typingtext";
import Chart from "./chart";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import DropDown from "./Dropdown";
import { useRouter } from "next/navigation";

function updateStreak(
  lastDate: string | null,
  currentStreak: number,
  maxStreak: number
) {
  const today = new Date().toISOString().split("T")[0];
  if (!lastDate) return { currentStreak: 1, lastDate: today, maxStreak: 1 };

  const diff =
    (new Date(today).getTime() - new Date(lastDate).getTime()) /
    (1000 * 60 * 60 * 24);

  if (diff < 1) return { currentStreak, maxStreak, lastDate };
  if (diff < 2) {
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      maxStreak: Math.max(maxStreak, newStreak),
      lastDate: today,
    };
  }

  return { currentStreak: 1, maxStreak, lastDate: today };
}

export default function InputBox({
  selectedTime,
  setSelectedTime,
  setWPM,
  setAccuracy,
  setcurrentDay,
}: {
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  setWPM: (wpm: number) => void;
  setAccuracy: (accuracy: number) => void;
  setcurrentDay: (day: number) => void;
}) {
  const route = useRouter();

  // streak key

  const streakKey = "streak_local";
  /* 🔥 LOAD STREAK ON INPUTBOX MOUNT */

  useEffect(() => {
    const saved = localStorage.getItem(streakKey);
    if (!saved) return;

    const { streak } = JSON.parse(saved);
    setcurrentDay(streak);
  }, []);

  // Enable btn on time select
  const [testCompleted, setTextCompleted] = useState(false);

  const canStartText = Boolean(selectedTime);
  // ---------- API  ----------
  const API = "https://jsonplaceholder.typicode.com/comments";
  // const API = "https://dummyjson.com/comments?limit=500";

  // ---------- CURRENT USER ----------
  const [user, setUser] = useState<null | { uid: string }>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsub();
  }, []);

  // ---------- SESSION ----------
  const [session, setSession] = useState<
    Array<{ wpm: number; accuracy: number; date: string }>
  >([]);

  // ---------- DIFFICULTY ----------
  const [difficulty, setDifficulty] = useState("Easy");

  // ✅ FIXED LOGIC (returns boolean)
  const isEasy = (text: string) =>
    text.length <= 10 && !/[^a-zA-Z0-9\s]/.test(text);

  const isMedium = (text: string) =>
    text.length > 10 && text.length <= 50 && /[.,!?;:]/.test(text);

  const isHard = (text: string) =>
    text.length > 100 && /[^a-zA-Z0-9\s]/.test(text);

  // ---------- LOAD SESSION ----------
  const storageKey = user ? `typingSession_${user.uid}` : `typingSession_local`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setSession(saved ? JSON.parse(saved) : []);
    console.log(
      "Loaded sessions from",
      storageKey,
      "count:",
      saved ? JSON.parse(saved).length : 0
    );
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(session));
    console.log("Saved sessions to", storageKey, "count:", session.length);
  }, [session, storageKey]);

  // ---------- RANDOM TEXT ----------
  const [text, setText] = useState("");

  const loadText = async () => {
    const res = await fetch(API);
    const data = await res.json();
    const cleaned = data.map((item: { body: string }) =>
      item.body.replace(/\n/g, " ")
    );

    let pool = [];

    // ✅ FIXED FILTERING
    if (difficulty === "Easy") pool = cleaned.filter(isEasy);
    else if (difficulty === "Medium") pool = cleaned.filter(isMedium);
    else if (difficulty === "Hard") pool = cleaned.filter(isHard);
    else pool = cleaned;

    // safety fallback
    if (pool.length === 0) pool = cleaned;

    const random = Math.floor(Math.random() * pool.length);
    setText(pool[random]);
  };

  useEffect(() => {
    loadText();
  }, [difficulty]);

  // ---------- TIMER ----------
  const [modalOpen, setModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!modalOpen) return;
    const interval = setInterval(
      () => setTimeLeft((t) => Math.max(t - 1, 0)),
      1000
    );
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

  // ---------- START / FINISH ----------
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
    setTextCompleted(true);
    setSession((prev) => [
      ...prev,
      {
        wpm: wpmRef.current,
        accuracy: accuracyRef.current,
        difficulty, // ✅ ADD THIS
        date: new Date().toISOString(),
      },
    ]);
    const saved = localStorage.getItem(streakKey);
    const parsed = saved
      ? JSON.parse(saved)
      : { currentStreak: 0, maxStreak: 0, lastDate: null };

    const result = updateStreak(
      parsed.lastDate || null,
      parsed.maxStreak,
      parsed.streak || 0
    );
    localStorage.setItem(streakKey, JSON.stringify(result));
    setcurrentDay(result.currentStreak);
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
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0d111f] rounded-2xl p-8 w-full max-w-3xl border border-purple-600">
              <TypingText
                text={text}
                disabled={timeLeft === 0}
                onTyping={(typedWords: any, totalWords: any) => {
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

        <div className="flex justify-center gap-4 mt-4">
          <h1 className="text-center mt-2">Time :</h1>

          {[10, 20, 30, 60].map((t) => (
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

          <DropDown difficulty={difficulty} setDifficulty={setDifficulty} />

          <button
            onClick={() => {
              console.log("heeloo here");
              console.log("API KEY:", process.env.GEMINI_API_KEY);
              route.push("/Summarize");
            }}
            disabled={!testCompleted}
            className={`px-6 py-2 rounded-xl transition ${
              testCompleted
                ? "bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-90 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            Ai Summarize
          </button>

          <button
            onClick={startTest}
            disabled={!canStartText}
            className={`px-6 py-2 rounded-xl text-white transition
              ${
                canStartText
                  ? "bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-90 cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed opacity-50"
              }
              `}
          >
            Start Typing
          </button>
        </div>
      </div>

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
