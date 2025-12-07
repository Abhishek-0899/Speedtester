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

export default function Chart({ sessions }: { sessions: any[] }) {

  
  if (sessions.length === 0) return <p className="text-white mt-4">No sessions yet</p>;

  // Aggregate sessions by date
  const aggregatedData: Record<string, { WPM: number; Error: number; Accuracy: number; count: number }> = {};

  sessions.forEach((session) => {
    const date = new Date(session.date).toLocaleDateString();
    if (!aggregatedData[date]) {
      aggregatedData[date] = { WPM: 0, Error: 0, Accuracy: 0, count: 0 };
    }
    aggregatedData[date].WPM += session.wpm;
    aggregatedData[date].Error += session.error;
    aggregatedData[date].Accuracy += parseFloat(session.ACCURACY);
    aggregatedData[date].count += 1;
  });

  // Calculate averages per day
  const data = Object.keys(aggregatedData).map((date) => {
    const dayData = aggregatedData[date];
    return {
      name: date,
      WPM: +(dayData.WPM / dayData.count).toFixed(1),
      Error: +(dayData.Error / dayData.count).toFixed(1),
      Accuracy: +(dayData.Accuracy / dayData.count).toFixed(1),
    };
  });

  return (
    <div style={{ width: "100%", height: 400 }} className="mt-10">
      <h2 className="text-white mb-4">Daily Typing Stats</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          key={sessions.length} // re-render when new session is added
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={false} />
          <Legend verticalAlign="top" align="right" />

          <Bar dataKey="WPM" fill="blue" barSize={20} />
          <Bar dataKey="Error" fill="red" barSize={20} />
          <Bar dataKey="Accuracy" fill="green" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
