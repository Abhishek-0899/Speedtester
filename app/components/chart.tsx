"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ---------------- CUSTOM TOOLTIP ---------------- */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null;

  return (
    <div className="rounded-xl bg-[#0f172a] border border-white/10 px-4 py-3 text-sm shadow-xl">
      <p className="text-gray-300 font-semibold mb-2">{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="flex items-center gap-2 text-gray-200">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.dataKey}: <span className="font-bold">{item.value}</span>
        </p>
      ))}
    </div>
  );
}

/* ---------------- CHART ---------------- */
export default function Chart({ chartData }) {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="mt-20 mb-20 flex items-center justify-center h-[300px] rounded-2xl border border-white/10 bg-[#12172a]">
        <p className="text-gray-400">No data yet</p>
      </div>
    );
  }

  return (
    <div className="mt-20 mb-20 rounded-2xl border border-white/10 bg-[#12172a] p-6">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Overall Progress</h2>
        <span className="text-sm text-gray-400">Last sessions</span>
      </div>

      {/* Chart */}
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="name"
              label={{
                value: "Day →",
                position: "insideBottom",
                offset: -12,
                fontWeight: "bold",
                fill: "#FBBF24",
              }}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <YAxis
              label={{
                value: "Stats →",
                angle: -90,
                offset:14,
                position: "insideLeft",
                fontWeight: "bold",
                fill: "#FBBF24",
              }}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ color: "#E5E7EB", fontSize: 12 }}
            />

            {/* Bars */}
            <Bar dataKey="WPM" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Accuracy" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Error" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
