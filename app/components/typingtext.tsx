"use client";
import { useEffect, useRef, useState } from "react";

export default function TypingText({ text, onComplete, onTyping, disabled }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // focus always
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 🔑 RESET input when new text arrives
  useEffect(() => {
    setInput("");
  }, [text]);

  const handleChange = (e) => {
    if (disabled) return;

    const value = e.target.value;

    // prevent overflow typing
    if (value.length > text.length) return;

    setInput(value);

    // 🔹 Live stats update
    if (onTyping) {
      const typedWords = value.trim().split(/\s+/).length; // number of words typed
      const totalWords = text.trim().split(/\s+/).length;
      onTyping(typedWords, totalWords);
    }

    // 🔥 completion trigger
    if (value.length === text.length) {
      onComplete?.();
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="relative font-mono leading-8 select-none whitespace-pre-wrap cursor-text"
    >
      {text.split("").map((char, index) => {
        let className = "text-gray-400 text-[19px]";

        if (index < input.length) {
          className =
            input[index] === char
              ? "text-green-500"
              : "text-red-400";
        }

        if (index === input.length && !disabled) {
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
