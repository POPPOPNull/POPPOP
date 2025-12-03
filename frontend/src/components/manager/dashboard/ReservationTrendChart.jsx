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

    fetchReservationTrend(popupNo)
      .then((res) => {
        // 응답이 없거나 빈 배열일 때
        if (!res || res.length === 0) {
          setData([]);
          setNoData(true);
          return;
        }

        setData(res);
      })
      .catch((err) => {
        console.error("예약 추이 조회 실패:", err);
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
          stroke="rgb(54, 162, 235)" 
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ReservationTrendChart;
