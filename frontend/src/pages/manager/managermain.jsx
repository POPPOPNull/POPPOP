import "./manager-page.css";
import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import ManagerMain from "../../layouts/managermain/manager-main";

function Manager() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />
        <ManagerMain />
      </div>
    </div>
  );
}

export default Manager;