"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FcSettings } from "react-icons/fc";
import { CiRedo } from "react-icons/ci";

export default function Dashboard() {
  const jsonText =
    "This is a sample text for typing practice. Try to type it correctly!";

  const [usertext, setUserText] = useState("");
  const [started, setStarted] = useState(false);

  // 10-second countdown
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef(null);

  // WPM Formula
  const correctChars = usertext.length;
  const wpm =
    timeLeft < 10
      ? Math.floor((correctChars * 60) / (5 * (10 - timeLeft)))
      : 0;

  // Start 10-sec countdown timer
  useEffect(() => {
    if (started && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [started]);

  // Stop timer at 0
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  // Reset function
  const resetTest = () => {
    setUserText("");
    setStarted(false);
    setTimeLeft(10);
  };

  return (
    <div className="min-h-screen bg-black px-50 pt-4">
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

      {/* LINE */}
      <div className="w-full h-px bg-gray-600 mb-6"></div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* WPM */}
        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">WPM</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            {wpm}
          </h1>
        </div>

        {/* Accuracy placeholder */}
        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">Accuracy</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">100%</h1>
        </div>

        {/* Timer */}
        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">Timer</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            00:{String(timeLeft).padStart(2, "0")}
          </h1>
        </div>
      </div>

      {/* TEXT BOX */}
      <div className="flex justify-center mt-5">
        <div className="rounded-xl bg-[#182633] p-4 w-full font-semibold md:w-[100%] relative">
          {/* Base Text */}
          <p className="text-white text-lg leading-relaxed select-none">
            {jsonText}
          </p>

          {/* Overlay Text */}
          <p className="absolute top-4 left-4 text-lg leading-relaxed pointer-events-none z-10">
            {jsonText.split("").map((char, index) => {
              const typedChar = usertext[index];

              let color = "";
              if (typedChar == null) color = "text-transparent";
              else if (typedChar === char) color = "text-green-400";
              else color = "text-red-500";

              return (
                <span key={index} className={color}>
                  {char}
                </span>
              );
            })}
          </p>

          {/* Invisible Input */}
          <input
            type="text"
            autoFocus
            className="absolute inset-0 w-full h-full opacity-0"
            value={usertext}
            disabled={timeLeft === 0}
            onChange={(e) => {
              if (!started) setStarted(true);
              if (timeLeft === 0) return; // stop typing
              setUserText(e.target.value);
            }}
          />
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="flex items-center gap-12 mt-3 text-white">
        <h1>WPM: {wpm}</h1>
        <h1>Accuracy: 100%</h1>
        <h1>Characters: {usertext.length}</h1>
        <h1>Time: 00:{String(timeLeft).padStart(2, "0")}</h1>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <div className="flex mr-5 gap-4">
          <h1 className="text-white">Change Text</h1>
          <h1 className="text-white">Download Results</h1>
        </div>

        <button
          onClick={resetTest}
          className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto"
        >
          <CiRedo className="text-xl" />
          <span>Restart Test</span>
        </button>
      </div>
    </div>
  );
}
