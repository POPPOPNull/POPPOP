import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import Reservation from "../../componenets/manager/reservation/reservation";
import "./manager-page.css";

function ReservationPage() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />
        <div className="manager-main-content">
          {/* <h2 style={{ margin: "8px 0 14px", fontWeight: 800 }}>
            나의 팝업스토어 &gt; 예약 내역
          </h2> */}
          <Reservation />
        </div>
      </div>
    </div>
  );
}
export default ReservationPage;