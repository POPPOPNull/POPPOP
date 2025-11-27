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

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />    {/* 날짜(String) 그대로 사용 */}
        <YAxis allowDecimals={false} />
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
