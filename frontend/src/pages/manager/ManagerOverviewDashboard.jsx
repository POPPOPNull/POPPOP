import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import "../../layouts/managermain/manager-main.css";
import "./manager-page.css";

import ManagerOverviewReservationTrendChart from "../../components/manager/dashboard/ManagerOverviewReservationTrendChart";
import ManagerOverviewEventTypeChart from "../../components/manager/dashboard/ManagerOverviewEventTypeChart";
import ManagerOverviewWeekdayReservationChart from "../../components/manager/dashboard/ManagerOverviewWeekdayReservationChart";
import ManagerOverviewGenderRatioChart from "../../components/manager/dashboard/ManagerOverviewGenderRatioChart";
import ManagerOverviewKPIData from "../../components/manager/dashboard/ManagerOverviewKPIData";

function ManagerOverviewDashboard() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />

        <div className="manager-main-content">
          <div className="manager-kpi-layout">
            <ManagerOverviewKPIData />
          </div>

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
