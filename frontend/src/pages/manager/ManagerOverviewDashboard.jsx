import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import "../../layouts/managermain/manager-main.css";
import "./manager-page.css";

import ManagerOverviewReservationTrendChart from "../../components/manager/dashboard/ManagerOverviewReservationTrendChart";
import ManagerOverviewEventTypeChart from "../../components/manager/dashboard/ManagerOverviewEventTypeChart";
import ManagerOverviewWeekdayReservationChart from "../../components/manager/dashboard/ManagerOverviewWeekdayReservationChart";
import ManagerOverviewGenderRatioChart from "../../components/manager/dashboard/ManagerOverviewGenderRatioChart";

function ManagerOverviewDashboard() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />

        <div className="manager-main-content">
          {/* <h2 style={{ margin: "8px 0 6px", fontWeight: 800 }}>대시보드</h2>
          <p style={{ marginBottom: "20px", color: "#666", fontSize: "14px" }}>
            내가 등록한 모든 팝업스토어의 데이터를 합산한 전체 대시보드입니다.
          </p> */}

          {/* 1행: 예약 추이 + 이벤트 타입 */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">
                예약 추이 <span className="dashboard-card-sub">최근 7일</span>
              </h3>
              <ManagerOverviewReservationTrendChart />
            </div>

            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">사용자 행동 유형 비율</h3>
              <ManagerOverviewEventTypeChart />
            </div>
          </section>

          {/* 2행: 요일별 예약 + 성별 비율 */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">요일별 예약 패턴</h3>
              <ManagerOverviewWeekdayReservationChart />
            </div>

            <div className="manager-dashboard-card">
              <h3 className="dashboard-card-title">예약자 성별 비율</h3>
              <ManagerOverviewGenderRatioChart />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ManagerOverviewDashboard;
