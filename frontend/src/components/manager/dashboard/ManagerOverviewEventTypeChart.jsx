import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { fetchManagerOverviewEventTypeStats } from "../../../api/ManagerAPI";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f7f",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

function ManagerOverviewEventTypeChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNoData(false);

    fetchManagerOverviewEventTypeStats()
      .then((res) => {
        if (!res || res.length === 0) {
          setData([]);
          setNoData(true);
          return;
        }
        setData(res);
      })
      .catch((err) => {
        console.error("전체 대시보드 | 이벤트 유형 비율 조회 실패:", err);
        setData([]);
        setNoData(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        로딩 중...
      </div>
    );
  }

  if (noData) {
    return (
      <div
        style={{
          width: "100%",
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
        }}
      >
        데이터가 없습니다.
      </div>
    );
  }

  const formatted = data.map((item) => ({
    name: item.eventType,
    value: item.count,
  }));

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {formatted.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ManagerOverviewEventTypeChart;
