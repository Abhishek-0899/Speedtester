"use client";
import { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

export default function DropDown() {
  const options = ["Easy", "Medium", "Hard"];

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === options.length - 1 ? 0 : prev + 1
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? options.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter") {
      setOpen(false);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-40">
      {/* main button */}
      <button
        className="w-full flex items-center justify-between bg-black border border-gray-700 px-4 py-2 rounded-xl text-white"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span>{options[selectedIndex]}</span>
        {open ? <BiUpArrow /> : <BiDownArrow />}
      </button>
{/* 
      dropdown menu
      {open && (
        <div className="absolute mt-2 w-full bg-black border border-gray-700 rounded-xl overflow-hidden z-10">
          {options.map((opt, index) => (
            <button
              key={opt}
              className={`block w-full px-4 py-2 text-left
                ${
                  selectedIndex === index
                    ? "bg-gray-800 text-blue-400"
                    : "text-white hover:bg-gray-800"
                }`}
              onClick={() => {
                setSelectedIndex(index);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
}
