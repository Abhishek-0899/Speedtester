import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const sampleData = [
  { name: "Page A", WPM: 4000, error: 2400, Accuracy: 2325 },
  { name: "Page B", WPM: 3000, error: 1398, Accuracy: 2220 },
  { name: "Page C", WPM: 2000, error: 9800, Accuracy: 1000 },
  { name: "Page D", WPM: 2780, error: 3908, Accuracy: 1500 },
  { name: "Page E", WPM: 1890, error: 4800, Accuracy: 1890 },
  { name: "Page F", WPM: 2390, error: 3800, Accuracy: 1500 },
  { name: "Page G", WPM: 3490, error: 4300, Accuracy: 4500 },
];

export default function Chart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <h2 className="text-white">Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sampleData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorWPM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" />
          <Area
            type="monotone"
            dataKey="WPM"
            stroke="#8884d8"
            fill="url(#colorWPM)"
            fillOpacity={1}
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="error"
            stroke="#82ca9d"
            fill="url(#colorError)"
            fillOpacity={1}
            isAnimationActive={isAnimationActive}
          />
          <Area
            type="monotone"
            dataKey="Accuracy"
            stroke="red"
            fill="url(#colorAccuracy)"
            fillOpacity={1}
            isAnimationActive={isAnimationActive}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
