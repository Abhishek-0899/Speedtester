"use client";

import { useEffect, useState } from "react";

export default function InputBox() {
  const dataApi = "https://jsonplaceholder.typicode.com/comments";
  const [text, setText] = useState("");
  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const res = await fetch(dataApi); // wait for fetch
      const data = await res.json(); // wait for JSON
      console.log("response:", data);
      const randomIndex = Math.floor(Math.random() * data.length);
      const rawText = data[randomIndex].body;
      const cleantext = rawText.replace(/\n/g, " ");
      setText(cleantext);
    } catch (e) {
      console.log("error in finding Data", e);
    }
  };

  // const removeNewLine = rawText.replace(/\n/g, " ");
  console.log("data from api is", dataApi);
  return (
    <div className="bg-[#12172a] rounded-xl w-full mx-auto">
      <div className="flex gap-4 p-4">
        <textarea
          className="text-gray-400 flex-1 border-none bg-transparent resize-none overflow-hidden"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          spellCheck={false}
        />

        <button className="flex bg-blue-800 rounded-xl px-3 items-center gap-4">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/text-cursor.png"
            alt="text-cursor"
          />
          <p className="text-sm">Start typing Test</p>
        </button>
      </div>
    </div>
  );
}
