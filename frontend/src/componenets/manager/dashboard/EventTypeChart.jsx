import { useEffect, useState } from "react";
import { fetchEventTypeStats } from "../../../api/ManagerAPI";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

function EventTypeChart({ popupNo }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!popupNo) return;

    fetchEventTypeStats(popupNo).then((res) => {
        if (!res || res.length === 0) {
      setData(res);
      return;
    }
    const total = res.reduce((sum, item) => sum + item.count, 0);

    const mapped = res.map((item) => ({
        ...item,
        percent: ((item.count / total) * 100).toFixed(1), 
      }));

        setData(mapped);
        });
    }, [popupNo]);
  

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7875", "#8dd1e1", "#d0ed57"];

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="percent"  
            nameKey="eventType"
            cx="50%"
            cy="50%"
            outerRadius={85}
            label={({ name, percent }) => `${name}: ${percent}%`}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [`${props.payload.percent}%`, "비율"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EventTypeChart;
