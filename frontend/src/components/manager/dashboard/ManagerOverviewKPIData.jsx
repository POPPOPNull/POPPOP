import { useEffect, useState } from "react";
import { fetchManagerOverviewSummary } from "../../../api/ManagerAPI";
import "./manager-dashboard.css";
import ManagerKpiCard from "./ManagerKpiCard";

function ManagerOverviewKPIData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchManagerOverviewSummary()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("전체 대시보드 상단 요약 조회 실패:", err);
      })
      .finally(() => setLoading(false));
  }, []);

    const todayReservationCount = data?.todayReservationCount ?? 0;
    const totalReservationCount = data?.totalReservationCount ?? 0;
    const totalFavoriteCount = data?.totalFavoriteCount ?? 0;  
    const totalReviewCount = data?.totalReviewCount ?? 0;      


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
        value={totalFavoriteCount}
        unit="건"
        loading={loading}
      />
      <ManagerKpiCard
        title="리뷰 수"
        value={totalReviewCount}
        unit="개"
        loading={loading}
      />
    </div>
  );
}

export default ManagerOverviewKPIData;
