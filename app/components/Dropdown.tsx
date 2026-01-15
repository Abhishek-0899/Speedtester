"use client";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";

export default function DropDown({ difficulty, setDifficulty }: any) {
  const options = ["Easy", "Medium", "Hard", "Random"];

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const idx = options.indexOf(difficulty);
    if (idx !== -1) setSelectedIndex(idx);
  }, [difficulty]);

  const handleKeyDown = (e: any) => {
    if (e.key == "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    }
    if (e.key == "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      setDifficulty(options[selectedIndex]);
      setOpen(false);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className="relative w-40">
      {/* main button */}
      <button
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between bg-black border border-gray-700 px-4 py-2 rounded-xl text-white"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{options[selectedIndex]}</span>
        {/* {open ? <BiUpArrow /> : <BiDownArrow />} */}
        <BiDownArrow
          className={`transition-transform duration-300
          ${open ? "rotate-180" : ""}`}
        />
      </button>
      {/* dropdown menu */}
      {open && (
        <div
          className={`absolute mt-2 w-full bg-black border border-gray-700 rounded-xl overflow-hidden z-10
        transition-all duration-200 origin-top
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        >
          {" "}
          {options.map((otp, index) => (
            <button
              key={otp}
              onClick={() => {
                setSelectedIndex(index);
                setDifficulty(otp);
                setOpen(false);
              }}
              className={`w-full text-left rounded-xl px-4 py-2 hover:bg-gray-700 transition-colors
              ${
                index === selectedIndex
                  ? "bg-gray-800 text-green-600"
                  : "text-white"
              }`}
            >
              {otp}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
