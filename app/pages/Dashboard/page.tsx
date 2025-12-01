"use client";
import { FcSettings } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Image from "next/image";
import { CiRedo } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black px-4 pt-4">
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
          <FcSettings className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]" />
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
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">100%</h1>
        </div>

        <div className="rounded-xl bg-[#182633] p-6">
          <h1 className="text-white">Timer</h1>
          <h1 className="text-blue-800 font-bold text-4xl md:text-5xl">
            00:00
          </h1>
        </div>
      </div>

      {/* INPUT BOX */}
      <div className="flex justify-center mt-5">
        <div className="rounded-xl bg-[#182633] p-4 w-full font-semibold md:w-[80%]">
          <textarea
            className="text-white w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
            placeholder="Enter your text here..."
            onChange={(e) => {
              // Auto adjust height
              e.target.style.height = "auto"; // reset height
              e.target.style.height = `${e.target.scrollHeight}px`;

              // Wrap every 15 words
              const words = e.target.value.split(/\s+/);
              const newLines: string[] = [];
              for (let i = 0; i < words.length; i += 50) {
                newLines.push(words.slice(i, i + 15).join(" "));
              }
              e.target.value = newLines.join("\n");
            }}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <button className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto">
          <CiRedo className="text-xl" />
          <span>Start Test</span>
        </button>
        <button className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto">
          <CiRedo className="text-xl" />
          <span>Retry Test</span>
        </button>

        <button
          onClick={() => router.push("/pages/leaderboard")}
          className="text-white flex items-center justify-center gap-2 bg-blue-800 px-4 py-3 rounded-xl w-full md:w-auto"
        >
          <IoCheckmarkDoneSharp className="text-xl" />
          <span>Finish</span>
        </button>
      </div>
    </div>
  );
}
