"use client";
import { FiSettings } from "react-icons/fi";
import { BsFillKeyboardFill } from "react-icons/bs";
import Image from "next/image";
import { VscGraph } from "react-icons/vsc";
import { auth } from "@/app/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else {
        setUserName(user.displayName || "User");
        setLoading(false);
      }
    });
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-white text-center gap-4">
        <div className="flex items-center gap-2">
          {" "}
          <Image src="/pacman1.png" alt="Logo" width={100} height={50} />{" "}
          <h1 className="text-4xl font-bold mb-4">Typing App</h1>
        </div>{" "}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-4xl font-bold">Hello {userName}</h1>
          <p>Ready to improve your typing speed?</p>
          <div className="flex flex-col gap-3 w-full mt-2">
            <button
              onClick={() => router.push("/pages/Dashboard")}
              className="bg-blue-800 w-full border border-black rounded-md px-3 py-2 flex items-center justify-center gap-3 cursor-pointer"
            >
              <BsFillKeyboardFill className="text-white" />
              <span>Start typing test</span>
            </button>

            <button
              onClick={() => router.push("/pages/leaderboard")}
              className="bg-gray-700 w-full border border-black hover:bg-blue-800 rounded-md px-3 py-2 flex items-center justify-center gap-3 cursor-pointer"
            >
              <VscGraph className="text-white" />
              <span>view Statistics</span>
            </button>

            <button
              onClick={() => router.push("/pages/Settings")}
              className="bg-gray-700 w-full border border-black hover:bg-blue-800 rounded-md px-3 py-2 flex items-center justify-center gap-3 cursor-pointer"
            >
              <FiSettings className="text-white" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
