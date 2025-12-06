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
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (!popupNo) return;

    fetchWeekdayReservations(popupNo)
      .then((res) => {
        console.log("요일별 예약 패턴:", res);
        if (!res || res.length === 0) {
          setData([]);
          setNoData(true);
          return;
        }

        setData(res);
      })
      .catch((err) => {
        console.error("요일별 예약 패턴 조회 실패:", err);
        setData([]);
        setNoData(true);
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

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dayOfWeek" />      {/* "월","화","수"... */}
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="reservationCount"
            name="예약 수"
            fill="rgba(75, 192, 192, 0.5)"
            stroke="rgba(75, 192, 192, 1)"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeekdayReservationChart;