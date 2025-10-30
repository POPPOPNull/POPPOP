import "./manager-page.css";
import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import Dashboard from "./dashboard"; 

function Manager() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />

        <div className="manager-main-content">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default Manager;