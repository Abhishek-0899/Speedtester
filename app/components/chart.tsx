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

export default function Chart({ chartData }) {
  if (!chartData || chartData.length === 0) {
    return <p className="text-gray-400 p-10">No data yet</p>;
  }

  return (
    <div className="mt-20 h-[400px] mb-20">
      <h2 className="text-white mb-4">Typing Progress</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{
              value: "Day →",

              position: "insideBottom",
              fontWeight: "bold",
              fill: "#FBBF24",
            }}
          />{" "}
          <YAxis
            label={{
              value: "Stats →",
              angle: -90,
              position: "insideLeft",
              fontWeight: "bold",
              fill: "#FBBF24",
            }}
          />
          <Tooltip cursor={false} />
          <Legend />
          <Bar dataKey="WPM" fill="#3b82f6" />
          <Bar dataKey="Accuracy" fill="#22c55e" />
          <Bar dataKey="Error" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
