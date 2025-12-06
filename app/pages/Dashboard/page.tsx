"use client";
import { useEffect, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import Image from "next/image";
import { FcSettings } from "react-icons/fc";
import { CiRedo } from "react-icons/ci";
import Chart from "@/app/components/chart";
import { ACCURACY } from "recharts/types/animation/easing";
import { timeStamp } from "console";

export default function Dashboard() {
  const jsonText = [
    "This is a sample text for typing practice. Try to type it correctly!",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    "Coding is not about typing fast, it’s about thinking clearly.",
    "Frontend development requires creativity, logic, and patience.",
  ];

  // console.log("JSON Text:", jsonText.length);
  const [usertext, setUserText] = useState("");
  const [started, setStarted] = useState(false);
  const [text, setText] = useState(jsonText[0]);
  // const [accuracy,setAccuracy]=useState(100);
  const RandomText = () => {
    const randomText = jsonText[Math.floor(Math.random() * jsonText.length)];
    setText(randomText);
    resetTest();
  };
  const calculateAccuracy = () => {
    const textLength = text.length;
    const correctChars = usertext
      .split("")
      .filter((char, index) => char === text[index]).length;
    const accuracy = (correctChars / textLength) * 100;
    return accuracy.toFixed(2);
  };
  // 10-second countdown
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef(null);

  // WPM Formula
  const correctChars = usertext.length;
  const wpm =
    timeLeft < 10 ? Math.floor((correctChars * 60) / (5 * (10 - timeLeft))) : 0;

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
      const session = {
        wpm: wpm,
        error: text.length - correctChars,
        ACCURACY: calculateAccuracy(),
        timeStamp: Date.now(),
        date: new Date().toLocaleDateString(),
      };
      // Add new session to sessionStorage
      const previousSession = JSON.parse(
        sessionStorage.getItem("typingSessions") || "[]"
      );
      previousSession.push(session);
      // saving back
      sessionStorage.setItem("typingSessions", JSON.stringify(previousSession));
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
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            {calculateAccuracy()}
          </h1>
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
        <div className="rounded-xl bg-[#182633] p-4 w-full font-semibold md:w-full relative">
          {/* Base Text */}
          <p className="text-white text-lg leading-relaxed select-none">
            {text}
          </p>

          {/* Overlay Text */}
          <p className="absolute top-4 left-4 text-lg leading-relaxed pointer-events-none z-10">
            {text.split("").map((char, index) => {
              const typedChar = usertext[index];
              const isCurrent = index === usertext.length;

              let color = "text-gray-400";

              if (typedChar != null) {
                color = typedChar === char ? "text-green-400" : "text-red-500";
              }

              return (
                <span key={index} className="relative">
                  {/* Actual character coloring */}
                  <span className={`${color}`}>{char}</span>

                  {/* YELLOW VERTICAL CARET */}
                  {isCurrent && (
                    <span
                      className="
            absolute 
            left-0 
            top-0 
            bottom-0 
            w-0.5 
            bg-yellow-400 
            caret-blink
          "
                    ></span>
                  )}
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
        <h1>Accuracy: {calculateAccuracy()} %</h1>
        <h1>Characters: {usertext.length}</h1>
        <h1>Time: 00:{String(timeLeft).padStart(2, "0")}</h1>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <div className="flex mr-5 gap-4">
          <button
            onClick={RandomText}
            className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto"
          >
            <BiReset className="text-xl bg-black" />
            <span className="text-white">Change Text</span>
          </button>
        </div>

        <button
          onClick={resetTest}
          className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto"
        >
          <CiRedo className="text-xl" />
          <span>Restart</span>
        </button>
      </div>
      <Chart />
    </div>
  );
}
