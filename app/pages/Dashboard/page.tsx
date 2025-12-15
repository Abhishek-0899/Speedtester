"use client";
import { useState } from "react";
import Chart from "@/app/components/chart";
import InputBox from "@/app/components/inputBox";
import Image from "next/image";
import { FcSettings } from "react-icons/fc";

export default function Dashboard() {
  const [sessions, setSessions] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem("typingSessions") || "[]");
  });

  const handleSessionComplete = (session: any) => {
    setSessions((prev) => {
      const updated = [...prev, session];
      localStorage.setItem("typingSessions", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-black px-6 pt-4 overflow-auto">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Image src="/user.jpg" alt="Logo" width={40} height={40} />
          <h1 className="text-amber-300 font-bold text-2xl">
            Typing Masters
          </h1>
        </div>
        <FcSettings className="w-8 h-8" />
      </nav>

      <div className="w-full h-px bg-gray-600 mb-6" />

      {/* INPUT BOX HANDLES ALL TYPING */}
      <InputBox onComplete={handleSessionComplete} />

      {/* CHART */}
      <Chart sessions={sessions} />
    </div>
  );
}
