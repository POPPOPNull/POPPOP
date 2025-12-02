import { useEffect, useState } from "react";
import { fetchEventTypeStats } from "../../../api/ManagerAPI";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";

function EventTypeChart({ popupNo }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);   
  const [noData, setNoData] = useState(false); 

  useEffect(() => {
    if (!popupNo) return;

    fetchEventTypeStats(popupNo).then((res) => {
        if (!res || res.length === 0) {
      setData(res);
      setNoData(true); 
      return;
    }
    const total = res.reduce((sum, item) => sum + item.count, 0);

    if (total === 0) {
          // 모두 0인 경우도 "데이터 없음"으로 처리
          setData([]);
          setNoData(true);
          return;
        }

    const mapped = res.map((item) => ({
        ...item,
        percent: Number(((item.count / total) * 100).toFixed(1)),
      }));

        setData(mapped);
      })
      .catch((err) => {
        console.error("이벤트 타입 비율 조회 실패:", err);
        setData([]);
        setNoData(true);
      })
      .finally(() => setLoading(false));
  }, [popupNo]);
  

  const COLORS = ["#FF6384", "#36A2EB","#FFCE56", "#4BC0C0", "#9966FF", "#d0ed57"];

   // 🔹 로딩 처리
  if (loading) {
    return (
      <div style={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
        로딩 중...
      </div>
    );
  }

  // 🔹 데이터 없음 처리
  if (noData) {
    return (
      <div style={{ width: "100%", height: 260, display: "flex", alignItems: "center", justifyContent: "center", color: "#777" }}>
        데이터가 없습니다.
      </div>
    );
  }

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
            label={({ eventType, percent }) => `${eventType}: ${percent}%`}
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
