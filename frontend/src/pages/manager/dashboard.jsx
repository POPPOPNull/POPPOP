import "./manager-page.css";
import ManagerSidebar from "../../layouts/managermain/manager-sidebar";
import DashboardLayout from "../../componenets/manager/dashboard/dashboardLayout";

function Dashboard() {
  return (
    <div className="manager-page">
      <div className="main-layout">
        <ManagerSidebar />
        <div className="manager-main-content">
          <DashboardLayout />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;