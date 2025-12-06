import { useParams } from "react-router-dom";
import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import "../../layouts/managermain/manager-main.css"; // MyPopupPage에서 쓰던 레이아웃
import "./manager-page.css"; // MyPopupPage에서 쓰던 페이지 스타일
import ManagerKPIData from "../../components/manager/dashboard/ManagerKPIData";
import ReservationTrendChart from "../../components/manager/dashboard/ReservationTrendChart";
import WeekdayReservationChart from "../../components/manager/dashboard/WeekdayReservationChart";
import GenderRatioChart from "../../components/manager/dashboard/GenderRatioChart";
import EventTypeChart from "../../components/manager/dashboard/EventTypeChart";


function ManagerDashboard() {
  const { popupNo } = useParams();

  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />

        <div className="manager-main-content">
          <div className="manager-kpi-layout">
            <ManagerKPIData popupNo={popupNo} />
          </div>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* 요일별 예약 패턴 */}
            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">
                예약 추이 <span className="dashboard-card-sub">최근 7일</span>
              </h3>

              <ReservationTrendChart popupNo={popupNo} />
            </div>

            {/* 이벤트 타입 */}
            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">사용자 행동 유형 비율</h3>
              <EventTypeChart popupNo={popupNo} />
            </div>

          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >

            {/* 요일별 예약 패턴 (막대 그래프) */}
            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">요일별 예약 패턴</h3>

              <WeekdayReservationChart popupNo={popupNo} />
            </div>

            {/* 예약자 성별 비율 (파이 차트) */}
            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">예약자 성별 비율</h3>

              <GenderRatioChart popupNo={popupNo} />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
