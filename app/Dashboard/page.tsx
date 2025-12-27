"use client";
import AuthGuard from "@/app/components/AuthGuard";
import { ArrowRight, TrendingUp, Clock, Flame } from "lucide-react";
import { useState } from "react";
import InputBox from "../components/inputBox";

export default function Dashboard() {
  const [selectedTime, setSelectedTime] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  return (
    <AuthGuard>
      <div className="bg-[#0b0f1a] min-h-screen text-white p-4 mx-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-3">
          <StatCard
            title="WPM"
            value={wpm}
            icon={<ArrowRight className="w-10 h-5" />}
          />

          <StatCard
            title="Accuracy"
            value={accuracy ? `${accuracy}%` : "--%"}
            footer="No data yet"
            icon={<TrendingUp className="w-10 h-5 text-green-400" />}
          />

          <StatCard
            title="Time Elapsed"
            value={`${selectedTime} sec`} // display selectedTime here
            icon={<Clock className="w-10 h-5 text-purple-400" />}
          />

          <StatCard
            title="Current Streak"
            value="🔥 x 0"
            footer="No streak yet"
            icon={<Flame className="w-10 h-5 text-yellow-500" />}
          />
        </div>

        {/* INPUT BOX BELOW CARDS */}
        <div className="mt-5">
          <InputBox
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            setWPM = {setWPM}
            setAccuracy = {setAccuracy}
          />
        </div>
      </div>
    </AuthGuard>
  );
}

/* ---------------- CARD ---------------- */

function StatCard({ title, value, icon, footer }) {
  return (
    <div className="border rounded-2xl overflow-hidden bg-[#12172a] shadow-md hover:shadow-purple-600 transition-shadow">
      <h1 className="text-3xl mt-3 mb-5 text-center font-semibold">{title}</h1>
      <div className="flex justify-center gap-11 text-2xl mb-4 items-center">
        <h1 className="text-3xl font-bold">{value}</h1>
        <div className="border p-3 bg-[#414455]/60 rounded-xl">{icon}</div>
      </div>
      {footer && (
        <p className="bg-[#414455]/60 text-white text-[15px] py-2 text-center font-semibold rounded-b-xl">
          {footer}
        </p>
      )}
    </div>
  );
}
