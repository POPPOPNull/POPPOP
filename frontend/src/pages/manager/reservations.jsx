import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import Reservation from "../../componenets/manager/reservation/reservation";
import "./manager-page.css";

function ReservationPage() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />
        <div className="manager-main-content">
          <Reservation />
        </div>
      </div>
    </div>
  );
}
export default ReservationPage;