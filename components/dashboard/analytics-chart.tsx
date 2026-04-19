"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AnalyticsChart({
  data,
}: {
  data: { day: string; views: number }[];
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(141,164,199,0.12)" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="#8da4c7"
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#8da4c7" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#0b1728",
              border: "1px solid rgba(141,164,199,0.18)",
              borderRadius: 16,
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
