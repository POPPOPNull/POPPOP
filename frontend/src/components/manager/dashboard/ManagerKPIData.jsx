import { useEffect, useState } from "react";
import { fetchManagerDashboardSummary } from "../../../api/ManagerAPI";
import "./manager-dashboard.css";
import ManagerKpiCard from "./ManagerKpiCard";

function ManagerKPIData({ popupNo }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!popupNo) return;

    setLoading(true);
    fetchManagerDashboardSummary(popupNo)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("매니저 대시보드 상단 요약 조회 실패:", err);
      })
      .finally(() => setLoading(false));
  }, [popupNo]);

  const todayReservationCount = data?.todayReservationCount ?? 0;
  const totalReservationCount = data?.totalReservationCount ?? 0;
  const favoriteCount = data?.totalFavoriteCount ?? 0;  
  const reviewCount = data?.totalReviewCount ?? 0; 



  return (
  <div className="mgrdash-kpi-row">
    <ManagerKpiCard
      title="오늘 예약 수"
      value={todayReservationCount}
      unit="건"
      loading={loading}
    />
    <ManagerKpiCard
      title="총 예약 수"
      value={totalReservationCount}
      unit="건"
      loading={loading}
    />
    <ManagerKpiCard
      title="관심 수"
      value={favoriteCount}
      unit="건"
      loading={loading}
    />
    <ManagerKpiCard
      title="리뷰 수"
      value={reviewCount}
      unit="개"
      loading={loading}
    />
  </div>
);
}

export default ManagerKPIData;
