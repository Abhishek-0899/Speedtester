"use client";
import { useEffect, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import { CiRedo } from "react-icons/ci";

const TEXTS = [
  "This is a sample text for typing practice. Try to type it correctly!",
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  "Coding is not about typing fast, it’s about thinking clearly.",
  "Frontend development requires creativity, logic, and patience.",
];

export default function InputBox({
  onComplete,
}: {
  onComplete: (session: any) => void;
}) {
  const [text, setText] = useState(TEXTS[0]);
  const [userText, setUserText] = useState("");
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const dataApi = "https://jsonplaceholder.typicode.com/comments";
  const handletextApi = async () => {
    const resposnse = await fetch(dataApi);
    const data = await resposnse.json();
    console.log(data);
  };
  useEffect(() => {
    handletextApi();
  }, []);
  const correctChars = userText.length;

  const wpm =
    timeLeft < 10 ? Math.floor((correctChars * 60) / (5 * (10 - timeLeft))) : 0;

  const accuracy = () => {
    const correct = userText.split("").filter((c, i) => c === text[i]).length;
    return ((correct / text.length) * 100).toFixed(2);
  };

  const resetTest = () => {
    setUserText("");
    setStarted(false);
    setTimeLeft(10);
  };

  const randomText = () => {
    setText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
    resetTest();
  };

  useEffect(() => {
    if (started && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [started]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current!);

      onComplete({
        wpm,
        ACCURACY: accuracy(),
        error: text.length - correctChars,
        timeStamp: Date.now(),
        date: new Date().toLocaleDateString(),
      });
    }
  }, [timeLeft]);

  return (
    <>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="WPM" value={wpm} />
        <Stat title="Accuracy" value={`${accuracy()}%`} />
        <Stat title="Timer" value={`00:${String(timeLeft).padStart(2, "0")}`} />
      </div>

      {/* TEXT BOX */}
      <div className="mt-5 relative bg-[#182633] p-4 rounded-xl font-semibold">
        <p className="text-white select-none">{text}</p>

        <p className="absolute top-4 left-4 pointer-events-none">
          {text.split("").map((char, i) => {
            const typed = userText[i];
            let color = "text-gray-400";
            if (typed)
              color = typed === char ? "text-green-400" : "text-red-500";
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </p>

        <input
          autoFocus
          className="absolute inset-0 w-full h-full opacity-0"
          value={userText}
          disabled={timeLeft === 0}
          onChange={(e) => {
            if (!started) setStarted(true);
            setUserText(e.target.value);
          }}
        />
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6 justify-center items-center ">
        <button
          onClick={randomText}
          className="py-2 px-3 bg-red-700 rounded-xl"
        >
          <BiReset /> Change Text
        </button>
        <button
          onClick={resetTest}
          className="py-2 px-3 bg-blue-700 rounded-xl"
        >
          <CiRedo /> Reset
        </button>
      </div>
    </>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="rounded-xl bg-[#182633] p-6">
      <h1 className="text-white">{title}</h1>
      <h1 className="text-blue-800 font-bold text-4xl">{value}</h1>
    </div>
  );
}
