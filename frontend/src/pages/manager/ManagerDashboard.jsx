import { useParams } from "react-router-dom";
import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import "../../layouts/managermain/manager-main.css"; // MyPopupPage에서 쓰던 레이아웃
import "./manager-page.css"; // MyPopupPage에서 쓰던 페이지 스타일
import ManagerKPIData from "../../componenets/manager/dashboard/ManagerKPIData";

function ManagerDashboard() {
  const { popupNo } = useParams();

  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />

        <div className="manager-main-content">
          <h2 style={{ margin: "8px 0 14px", fontWeight: 800 }}>대시보드</h2>

          {/* 상단 KPI 카드 */}
          <section style={{ marginBottom: "24px" }}>
            <ManagerKPIData popupNo={popupNo} />
          </section>

          {/* 아래 차트 2개 자리 (지금은 박스만, 나중에 차트 채우기) */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div className="manager-dashboard-card">
              요일별 예약 패턴 (추후 구현)
            </div>
            <div className="manager-dashboard-card">
              예약자 성별 비율 (추후 구현)
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
