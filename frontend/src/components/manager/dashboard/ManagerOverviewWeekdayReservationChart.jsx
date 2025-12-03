import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { fetchManagerOverviewWeekdayReservations } from "../../../api/ManagerAPI";

function ManagerOverviewWeekdayReservationChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNoData(false);

    fetchManagerOverviewWeekdayReservations()
      .then((res) => {
        if (!res || res.length === 0) {
          setData([]);
          setNoData(true);
          return;
        }
        setData(res);
      })
      .catch((err) => {
        console.error("전체 대시보드 | 요일별 예약 패턴 조회 실패:", err);
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
    day: item.dayOfWeek,
    reservationCount: item.reservationCount,
  }));

  const maxCount = formatted.length
    ? Math.max(...formatted.map((d) => d.reservationCount))
    : 0;
  const yMax = Math.max(10, Math.ceil(maxCount / 10) * 10);

  const yTicks = [];
  for (let v = 0; v <= yMax; v += 10) {
    yTicks.push(v);
  }

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <BarChart
          data={formatted}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} domain={[0, yMax]} ticks={yTicks} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="reservationCount"
            name="예약 수"
            fill="rgb(54, 162, 235)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ManagerOverviewWeekdayReservationChart;
