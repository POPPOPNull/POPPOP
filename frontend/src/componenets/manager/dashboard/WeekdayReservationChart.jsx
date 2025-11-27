import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { fetchWeekdayReservations } from "../../../api/ManagerAPI";

function WeekdayReservationChart({ popupNo }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!popupNo) return;

    fetchWeekdayReservations(popupNo)
      .then((res) => {
        console.log("요일별 예약 패턴:", res);
        setData(res);
      })
      .catch((err) => console.error("요일별 예약 패턴 조회 실패:", err));
  }, [popupNo]);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dayOfWeek" />      {/* "월","화","수"... */}
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="reservationCount" name="예약 수" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeekdayReservationChart;