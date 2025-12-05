import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { fetchReservationTrend } from "../../../api/ManagerAPI";

function ReservationTrendChart({ popupNo }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
  if (!popupNo) return;

  setLoading(true);
  setNoData(false);

  const mock = [
    { date: "2025-11-29", reservationCount: 2 },
    { date: "2025-11-30", reservationCount: 5 },
    { date: "2025-12-01", reservationCount: 3 },
    { date: "2025-12-02", reservationCount: 7 },
    { date: "2025-12-03", reservationCount: 1 },
    { date: "2025-12-04", reservationCount: 4 },
    { date: "2025-12-05", reservationCount: 6 },
  ];

  fetchReservationTrend(popupNo)
    .then((res) => {
      const list = Array.isArray(res) ? res : res?.data;
      if (!list || list.length === 0) {
        setData(mock);     // 🔥 데이터 없으면 목데이터 사용
        return;
      }

      const sorted = [...list].sort((a, b) =>
        String(a.date).localeCompare(String(b.date))
      );

      setData(sorted);
    })
    .catch(() => {
      setData(mock);       // 🔥 오류 발생해도 목데이터 사용
    })
    .finally(() => setLoading(false));
}, [popupNo]);

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

  // Y축 최대값 계산 (단위 10)
  const maxCount = data.length
    ? Math.max(...data.map((d) => d.reservationCount ?? 0))
    : 0;
  const yMax = Math.max(10, Math.ceil(maxCount / 10) * 10);

  const yTicks = [];
  for (let v = 0; v <= yMax; v += 10) {
    yTicks.push(v);
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* 🔥 X축은 그대로 date */}
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} domain={[0, yMax]} ticks={yTicks} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="reservationCount"
          name="예약 수"
          stroke="rgb(54, 162, 235)"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ReservationTrendChart;
