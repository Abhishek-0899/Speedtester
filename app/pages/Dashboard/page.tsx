"use client";
import { useEffect, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import Image from "next/image";
import { FcSettings } from "react-icons/fc";
import { CiRedo } from "react-icons/ci";
import Chart from "@/app/components/chart";

export default function Dashboard() {
  const jsonText = [
    "This is a sample text for typing practice. Try to type it correctly!",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Coding is not about typing fast, it’s about thinking clearly.",
    "Frontend development requires creativity, logic, and patience.",
  ];

  const [usertext, setUserText] = useState("");
  const [started, setStarted] = useState(false);
  const [text, setText] = useState(jsonText[0]);
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // sessions state holds all typing sessions
  const [sessions, setSessions] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem("typingSessions") || "[]");
  });

  // pick random text
  const RandomText = () => {
    const randomText = jsonText[Math.floor(Math.random() * jsonText.length)];
    setText(randomText);
    resetTest();
  };

  // calculate accuracy
  const calculateAccuracy = () => {
    const correctChars = usertext
      .split("")
      .filter((char, index) => char === text[index]).length;
    return ((correctChars / text.length) * 100).toFixed(2);
  };

  // reset typing test
  const resetTest = () => {
    setUserText("");
    setStarted(false);
    setTimeLeft(10);
  };

  // WPM formula
  const correctChars = usertext.length;
  const wpm =
    timeLeft < 10 ? Math.floor((correctChars * 60) / (5 * (10 - timeLeft))) : 0;

  // start timer countdown
  useEffect(() => {
    if (started && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [started]);

  // add new session when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current!);

      const session = {
        wpm,
        error: text.length - correctChars,
        ACCURACY: calculateAccuracy(),
        timeStamp: Date.now(),
        date: new Date().toLocaleDateString(),
      };

      // Append new session
      setSessions((prev) => {
        const updated = [...prev, session];
        localStorage.setItem("typingSessions", JSON.stringify(updated)); // persist
        return updated;
      });
    }
  }, [timeLeft]);

  const clearSession = () => {
    localStorage.removeItem("typingSessions");
    setSessions([]);
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-4">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between w-full py-4">
        <div className="flex items-center gap-3">
          <Image src="/user.jpg" alt="Logo" width={40} height={40} />
          <h1 className="text-amber-300 font-bold text-2xl md:text-3xl">
            Typing Masters
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src="/user.jpg"
            alt="User"
            width={35}
            height={35}
            className="rounded-full"
          />
          <FcSettings className="w-8 h-8 md:w-10 md:h-10" />
        </div>
      </nav>

      <div className="w-full h-px bg-gray-600 mb-6"></div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">WPM</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            {wpm}
          </h1>
        </div>

        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">Accuracy</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            {calculateAccuracy()}%
          </h1>
        </div>

        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">Timer</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            00:{String(timeLeft).padStart(2, "0")}
          </h1>
        </div>
      </div>

      {/* TEXT BOX */}
      <div className="flex justify-center mt-5">
        <div className="rounded-xl bg-[#182633] p-4 w-full md:w-full relative font-semibold">
          <p className="text-white text-lg leading-relaxed select-none">
            {text}
          </p>

          <p className="absolute top-4 left-4 text-lg leading-relaxed pointer-events-none z-10">
            {text.split("").map((char, index) => {
              const typedChar = usertext[index];
              const isCurrent = index === usertext.length;
              let color = "text-gray-400";
              if (typedChar != null)
                color = typedChar === char ? "text-green-400" : "text-red-500";
              return (
                <span key={index} className="relative">
                  <span className={`${color}`}>{char}</span>
                  {isCurrent && (
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-yellow-400 caret-blink"></span>
                  )}
                </span>
              );
            })}
          </p>

          <input
            type="text"
            autoFocus
            className="absolute inset-0 w-full h-full opacity-0"
            value={usertext}
            disabled={timeLeft === 0}
            onChange={(e) => {
              if (!started) setStarted(true);
              if (timeLeft === 0) return;
              setUserText(e.target.value);
            }}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <button
          onClick={RandomText}
          className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto"
        >
          <BiReset className="text-xl bg-black" />
          <span>Change Text</span>
        </button>

        <button
          onClick={resetTest}
          className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto"
        >
          <CiRedo className="text-xl" />
          <span>Restart</span>
        </button>
        {/* <div
          onClick={clearSession}
          className="cursor-pointer text-white flex items-center justify-center gap-2 bg-red-600 px-4 py-3 rounded-xl w-full md:w-auto"
        >
          <BiReset className="text-xl bg-black" />
          <span>Clear Sessions</span>
        </div> */}
      </div>

      {/* Chart with live updating sessions */}
      <Chart sessions={sessions} />
    </div>
  );
}
