"use client";
import AuthGuard from "@/app/components/AuthGuard";
import { ArrowRight, TrendingUp, Clock, Flame } from "lucide-react";
import InputBox from "../components/inputBox";
export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="bg-[#0b0f1a] min-h-screen text-white p-6">
        {/* ONE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          {/* CARD 1 */}
          <StatCard
            title="WPM"
            value="0"
            icon={<ArrowRight className="w-5 h-5" />}
          />

          {/* Accuracy */}
          <StatCard
            title="Accuracy"
            value="--%"
            footer="No data yet"
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
          />
          {/* Time Elapsed */}
          <StatCard
            title="Time Elapsed"
            value="00:00"
            icon={<Clock className="w-5 h-5 text-purple-400" />}
          />

          {/* Current Streak */}
          <StatCard
            title="Current Streak"
            value="🔥 x 0"
            footer="No streak yet"
            icon={<Flame className="w-5 h-5 text-green-400" />}
          />
        </div>
      </div>
     {/*  */}
     <InputBox/>
    </AuthGuard>
  );
}

/* ---------------- CARD ---------------- */

function StatCard({ title, value, icon, footer }) {
  return (
    <div className="border rounded-2xl overflow-hidden bg-[#12172a]">
      <h1 className="text-3xl p-5">{title}</h1>
      <div className="flex items-center justify-center gap-5 text-2xl mb-4">
        <h1>{value}</h1>
        <Flame className="w-5 h-5 text-green-400" />
      </div>
      {footer ? (
        <p className="bg-amber-500 text-center text-sm py-2">{footer}</p>
      ) : (
        ""
      )}
    </div>
  );
}
