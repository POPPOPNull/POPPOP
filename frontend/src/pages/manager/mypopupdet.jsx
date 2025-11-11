import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import MyPopupDet from "../../componenets/manager/mypopup/mypopupdet";
import "./manager-page.css"; 

function MyPopupDetPage() {
  return (
    <div className="manager-page">
      <div className="main-layout">
    
        <ManagerSidebar />

        <div className="manager-main-content">
          <h2 style={{ margin: "8px 0 14px", fontWeight: 800 }}>
            나의 팝업스토어 &gt; 상세
          </h2>
          <MyPopupDet />
        </div>
      </div>
    </div>
  );
}

export default MyPopupDetPage;
