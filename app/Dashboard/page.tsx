"use client";
import AuthGuard from "@/app/components/AuthGuard";
import { ArrowRight, TrendingUp, Clock, Flame } from "lucide-react";
import InputBox from "../components/inputBox";

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="bg-[#0b0f1a] min-h-screen text-white p-4 mx-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-3">
          <StatCard
            title="WPM"
            value="0"
            icon={<ArrowRight className="w-10 h-5" />}
          />

          <StatCard
            title="Accuracy"
            value="--%"
            footer="No data yet"
            icon={<TrendingUp className="w-10 h-5 text-green-400" />}
          />

          <StatCard
            title="Time Elapsed"
            value="00:30"
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
          <InputBox />
        </div>
      </div>
    </AuthGuard>
  );
}

/* ---------------- CARD ---------------- */

function StatCard({ title, value, icon, footer }) {
  return (
    <div className="border rounded-2xl overflow-hidden bg-[#12172a]">
      <h1 className="text-3xl mt-3 ml-4 mb-5 text-center">{title}</h1>
      <div className="flex justify-center gap-11 text-2xl mb-4">
        <h1 className="text-3xl">{value}</h1>
        {/* <Flame className="w-5 h-5 text-green-400" /> */}
        <h1 className="border p-3 bg-[#414455]/60 rounded-xl">{icon}</h1>
      </div>
      {footer ? (
        <p className="bg-[#414455]/60 text-white text-[15px] py-2 text-center font-semibold">
          {" "}
          {footer}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
