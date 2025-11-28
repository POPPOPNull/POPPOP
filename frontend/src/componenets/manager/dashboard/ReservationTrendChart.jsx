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

  useEffect(() => {
    if (!popupNo) return;

    fetchReservationTrend(popupNo)
      .then((res) => setData(res))
      .catch((err) => console.error("예약 추이 조회 실패:", err));
  }, [popupNo]);

  //Y축 최대값 계산 (단위 10)
  const maxCount = data.length ? Math.max(...data.map((d) => d.reservationCount)) : 0;
  const yMax = Math.max(10, Math.ceil(maxCount / 10) * 10);

  //Y축 눈금
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
        <XAxis dataKey="date" />    
        <YAxis
          allowDecimals={false}
          domain={[0, yMax]}
          ticks={yTicks}
        />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="reservationCount"
          name="예약 수"
          stroke="#4F46E5"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ReservationTrendChart;
