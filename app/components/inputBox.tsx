"use client";
import { useEffect, useState } from "react";
import TypingText from "./typingtext";

export default function InputBox() {
  const dataApi = "https://jsonplaceholder.typicode.com/comments";
  const [text, setText] = useState("");

  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const res = await fetch(dataApi);
      const data = await res.json();

      const randomIndex = Math.floor(Math.random() * data.length);
      const cleanText = data[randomIndex].body.replace(/\n/g, " ");

      setText(cleanText);
    } catch (e) {
      console.log("error fetching text", e);
    }
  };

  return (
    <div className="relative bg-[#12172a] rounded-xl w-full mx-auto p-6 overflow-hidden">
      {/* MONKEYTYPE TEXT */}
      {text && <TypingText text={text} />}

      {/* BUTTON */}
      <div className="mt-6 flex justify-end relative z-10">
        <button className="bg-blue-800 px-4 py-2 rounded-xl flex items-center gap-2 relative overflow-hidden">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/color/48/text-cursor.png"
            alt="cursor"
          />
          <span>Start typing test</span>
        </button>
      </div>
      <div className="glowing-blue-line"></div>
    </div>
  );
}
