"use client";
import { useEffect, useRef, useState } from "react";

export default function TypingText({ text }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div
      onClick={() => inputRef.current.focus()}
      className="font-mono leading-8 select-none whitespace-pre-wrap cursor-text"
    >
      {text.split("").map((char, index) => {
        let className = "text-gray-500";

        if (index < input.length) {
          className =
            input[index] === char
              ? "text-green-500"
              : "text-red-400";
        }

        if (index === input.length) {
        //   className += " border-blue-400 border-l-2";
          className += " caret-blink";
        }

        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}

      <input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        className="absolute opacity-0 pointer-events-none"
      />
    </div>
  );
}
