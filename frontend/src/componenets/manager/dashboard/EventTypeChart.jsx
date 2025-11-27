import { useEffect, useState } from "react";
import { fetchEventTypeStats } from "../../../api/ManagerAPI";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

function EventTypeChart({ popupNo }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!popupNo) return;

    fetchEventTypeStats(popupNo).then((res) => {
      setData(res);
    });
  }, [popupNo]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7875", "#8dd1e1", "#d0ed57"];

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="eventType"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EventTypeChart;
