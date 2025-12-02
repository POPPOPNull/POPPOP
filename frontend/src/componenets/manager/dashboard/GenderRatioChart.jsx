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

const COLORS = ["#36A2EB", "#FF6384"]; // 여자/남자 색상

function GenderRatioChart({ popupNo }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (!popupNo) return;

    fetchGenderRatio(popupNo)
      .then((res) => {
        console.log("성별 비율 데이터:", res);

        // 응답이 없거나 빈 배열이면
        if (!res || res.length === 0) {
          setData([]);
          setNoData(true);
          return;
        }

        // gender: 'F' → label: '여성'
        // gender: 'M' → label: '남성'
        const mapped = res.map((item) => ({
          name: item.gender === "F" ? "여성" : "남성",
          value: item.count,
        }));

        const total = mapped.reduce((sum, item) => sum + item.value, 0);

        // 모두 0인 경우도 "데이터 없음" 처리
        if (total === 0) {
          setData([]);
          setNoData(true);
          return;
        }

        setData(mapped);
      })
      .catch((err) => {
        console.error("성별 비율 조회 실패:", err);
        setData([]);
        setNoData(true);
      })
      .finally(() => setLoading(false));
  }, [popupNo]);

  // 🔹 로딩 상태
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        로딩 중...
      </div>
    );
  }

  // 🔹 데이터 없음 상태
  if (noData) {
    return (
      <div
        style={{
          width: "100%",
          height: 260,
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
