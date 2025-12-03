import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import MyPopup from "../../componenets/manager/mypopup/mypopup";
import "./manager-page.css";

function MyPopupPage() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />
        <div className="manager-main-content">
          {/* <h2 style={{ margin: "8px 0 14px", fontWeight: 800 }}>내 팝업스토어</h2> */}
          <MyPopup />
        </div>
      </div>
    </div>
  );
}

export default MyPopupPage;