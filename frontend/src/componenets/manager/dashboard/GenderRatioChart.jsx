import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { fetchGenderRatio } from "../../../api/ManagerAPI";

const COLORS = ["#8884d8", "#82ca9d"]; // 여자/남자 색상

function GenderRatioChart({ popupNo }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!popupNo) return;

    fetchGenderRatio(popupNo)
      .then((res) => {
        console.log("성별 비율 데이터:", res);

        // gender: 'F' → label: '여성'
        // gender: 'M' → label: '남성'
        const mapped = res.map((item) => ({
          name: item.gender === "F" ? "여성" : "남성",
          value: item.count,
        }));

        setData(mapped);
      })
      .catch((err) => console.error("성별 비율 조회 실패:", err));
  }, [popupNo]);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default GenderRatioChart;
