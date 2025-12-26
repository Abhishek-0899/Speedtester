"use client";
import { useEffect, useState } from "react";
import TypingText from "./typingtext";

export default function InputBox() {
  const dataApi = "https://jsonplaceholder.typicode.com/comments";
  const [text, setText] = useState("");
  const [modal, setModal] = useState(false);
  const [timeleft, setTimeleft] = useState(10);
  const [selectedTime, setSelectedTime] = useState(30);

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
  useEffect(() => {
    fetchApiData();
  }, []);

  // decrease timeleft set to 0
  useEffect(() => {
    if (!modal) return;

    const interval = setInterval(() => {
      setTimeleft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [modal]);

  // auto close modal when time = 0
  useEffect(() => {
    if (timeleft === 0 && modal) {
      setModal(false);
    }
  }, [timeleft, modal]);
  // show new text on completion of current text
  const handleNewTextonComplete = () => {
    if (timeleft > 0) {
      fetchApiData();
    }
  };
  // start test btn to open a modal
  const toggleStartTest = () => {
    console.log("i toggle");
    setTimeleft(selectedTime);
    setModal(true);
  };

  // text from dashboard to set in modal
  const Selectedtime = (time) => {
    setSelectedTime(time);
    setTimeleft(time);
  };

  // close btn in modal
  const handleClose = () => {
    setModal(false);
    setTimeleft(selectedTime);
  };

  return (
    <div className="relative bg-[#12172a] rounded-xl w-full mx-auto p-6 overflow-hidden">
      {modal && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center px-8">
          {/* Typing Box */}
          <div
            className="w-full max-w-6xl h-[220px] 
                    border border-amber-300 rounded-xl 
                    px-10 py-8 flex items-center"
          >
            <TypingText
              text={text}
              onComplete={handleNewTextonComplete}
              disabled={timeleft === 0}
            />
          </div>

          {/* Footer Controls */}
          <div className="mt-6 flex items-center justify-around gap-10 text-sm text-gray-300">
            <span className="text-xl">Timeleft : {timeleft} sec</span>
            {/* 
            <button
              className="px-4 py-1.5 rounded-md 
                   bg-blue-500 hover:bg-blue-600 
                   transition"
            >
              Restart
            </button> */}

            <button
              onClick={() => handleClose()}
              className="px-4 py-1.5 rounded-md cursor-pointer
                   bg-red-500 hover:bg-red-600 
                   transition"
            >
              Close
            </button>
            <span className="text-xl">Difficulty : Medium</span>
          </div>
        </div>
      )}

      {/* BUTTON */}
      <div className="mt-6 flex items-center justify-center relative z-10">
        Timeleft :
        <div className="flex items-center justify-center gap-7">
          <button
            onClick={() => Selectedtime(30)}
            className="bg-blue-800 px-4 py-2 rounded-xl flex items-center gap-2 relative overflow-hidden cursor-pointer hover:bg-blue-950"
          >
            30
          </button>
          <button
            onClick={() => Selectedtime(60)}
            className="bg-blue-800 px-4 py-2 rounded-xl flex items-center gap-2 relative overflow-hidden cursor-pointer hover:bg-blue-950"
          >
            60
          </button>
          <button
            onClick={() => Selectedtime(90)}
            className="bg-blue-800 px-4 py-2 rounded-xl flex items-center gap-2 relative overflow-hidden cursor-pointer hover:bg-blue-950"
          >
            90
          </button>
        </div>
        <button
          onClick={() => toggleStartTest()}
          className="bg-blue-800 px-4 py-2 rounded-xl flex items-center gap-2 relative overflow-hidden cursor-pointer hover:bg-blue-950"
        >
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
