"use client";
import { useEffect, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import { CiRedo } from "react-icons/ci";

type SessionResult = {
  wpm: number;
  accuracy: string;
  errors: number;
  timeStamp: number;
  date: string;
};

export default function InputBox({
  onComplete,
}: {
  onComplete: (session: SessionResult) => void;
}) {
  // API texts
  const [texts, setTexts] = useState<string[]>([]);
  // current text
  const [text, setText] = useState("");
  const [userText, setUserText] = useState("");
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const DATA_API = "https://jsonplaceholder.typicode.com/comments";

  // ---------------- FETCH TEXTS ----------------
  const fetchTexts = async () => {
    try {
      setLoading(true);
      const response = await fetch(DATA_API);
      const data = await response.json();

      const extractedTexts = data.map((item: any) => item.body);

      setTexts(extractedTexts);
      setText(
        extractedTexts[Math.floor(Math.random() * extractedTexts.length)]
      );
    } catch (error) {
      console.error("Failed to fetch texts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  // ---------------- METRICS ----------------
  const correctChars = userText
    .split("")
    .filter((char, i) => char === text[i]).length;

  const wpm =
    timeLeft < 10
      ? Math.floor((correctChars * 60) / (5 * (10 - timeLeft)))
      : 0;

  const accuracy = () => {
    if (!text.length) return "0.00";
    return ((correctChars / text.length) * 100).toFixed(2);
  };

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (started && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      onComplete({
        wpm,
        accuracy: accuracy(),
        errors: userText.length - correctChars,
        timeStamp: Date.now(),
        date: new Date().toLocaleDateString(),
      });
    }
  }, [timeLeft]);

  // ---------------- ACTIONS ----------------
  const resetTest = () => {
    setUserText("");
    setStarted(false);
    setTimeLeft(10);
  };

  const randomText = () => {
    if (!texts.length) return;
    const nextText = texts[Math.floor(Math.random() * texts.length)];
    setText(nextText);
    resetTest();
  };

  // ---------------- UI ----------------
  if (loading) {
    return (
      <p className="text-white text-center">
        Loading typing content...
      </p>
    );
  }

  return (
    <>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="WPM" value={wpm} />
        <Stat title="Accuracy" value={`${accuracy()}%`} />
        <Stat
          title="Timer"
          value={`00:${String(timeLeft).padStart(2, "0")}`}
        />
      </div>

      {/* TEXT BOX */}
      <div className="mt-5 bg-[#182633] p-4 rounded-xl font-semibold relative max-h-72 overflow-y-auto">
        {/* Highlighted text */}
        <div className="whitespace-pre-wrap break-words text-white">
          {text.split("").map((char, i) => {
            const typed = userText[i];
            let color = "text-gray-400";

            if (typed) {
              color =
                typed === char ? "text-green-400" : "text-red-500";
            }

            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Invisible textarea overlay */}
        <textarea
          autoFocus
          className="absolute inset-0 w-full h-full opacity-0 resize-none"
          value={userText}
          disabled={timeLeft === 0}
          onChange={(e) => {
            if (!started) setStarted(true);
            setUserText(e.target.value);
          }}
        />
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6 justify-center items-center">
        <button
          onClick={randomText}
          className="py-2 px-3 bg-red-700 rounded-xl flex items-center gap-2"
        >
          <BiReset /> Change Text
        </button>

        <button
          onClick={resetTest}
          className="py-2 px-3 bg-blue-700 rounded-xl flex items-center gap-2"
        >
          <CiRedo /> Reset
        </button>
      </div>
    </>
  );
}

// ---------------- STAT COMPONENT ----------------
function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-xl bg-[#182633] p-6 text-center">
      <h1 className="text-white">{title}</h1>
      <h1 className="text-blue-400 font-bold text-4xl">{value}</h1>
    </div>
  );
}
