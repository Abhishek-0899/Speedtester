"use client";
import { FcSettings } from "react-icons/fc";
import Image from "next/image";
import { CiRedo } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const jsonText = {
    text: "This is a sample text for typing practice. Try to type it correctly!",
  };

  const [userInput, setUserInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const correctChars = userInput
    .split("")
    .filter((char, idx) => char === jsonText.text[idx]).length;

  const accuracy = ((correctChars / jsonText.text.length) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-black px-6 md:px-12 pt-6">
      <div className="max-w-5xl mx-auto">
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
          <div className="rounded-xl bg-[#182633] p-6">
            <h1 className="text-white">WPM</h1>
            <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">0</h1>
          </div>

          <div className="rounded-xl bg-[#182633] p-6">
            <h1 className="text-white">Accuracy</h1>
            <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
              100%
            </h1>
          </div>

          <div className="rounded-xl bg-[#182633] p-6">
            <h1 className="text-white">Timer</h1>
            <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
              00:00
            </h1>
          </div>
        </div>

        {/* Read-only text */}
        <div className="relative mb-3 bg-gray-100 p-3 mt-6 rounded font-mono">
          {jsonText.text.split("").map((char, idx) => {
            let color = "black";
            if (userInput[idx]) {
              color = userInput[idx] === char ? "green" : "red";
            }
            return (
              <span key={idx} style={{ color }}>
                {char}
              </span>
            );
          })}

          <textarea
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-black resize-none outline-none"
            style={{ fontFamily: "monospace" }}
          />
        </div>

        {/* BOTTOM STATS */}
        <div className="flex flex-wrap gap-6 mt-6 text-gray-400 font-semibold">
          <h1>
            WPM <span className="text-white">82</span>
          </h1>
          <h1>
            Accuracy <span className="text-green-500">96%</span>
          </h1>
          <h1>
            Score <span className="text-white">82</span>
          </h1>
          <h1>
            Time <span className="text-white font-bold">00:56</span>
          </h1>
          <h1>
            Character <span className="text-white">278</span>
          </h1>
          <h1>
            Error <span className="text-red-700">4</span>
          </h1>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <div className="flex gap-6 text-white">
            <h1>Change Text</h1>
            <h1>Download Results</h1>
          </div>

          <button className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto">
            <CiRedo className="text-xl" />
            <span>Restart Test</span>
          </button>
        </div>
      </div>
    </div>
  );
}
