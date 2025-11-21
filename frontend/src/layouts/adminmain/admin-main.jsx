import "./Admin-main.css"
import AdminChart from "../../componenets/admin/AdminChart"
import AdminLineChart from "../../componenets/admin/AdminLineChart"
import AdminBarChart from "../../componenets/admin/adminBarChart"
import KPIData from "../../componenets/admin/adminKPIData"

function AdminMain (){
    return(
        <>
            <div className="adminKPI-layout">
                <KPIData/>                
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <AdminLineChart/>
                </div>
                <div className="admin-chart-box">
                    <AdminChart/>
                </div>
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <AdminLineChart/>
                </div>
                <div className="admin-chart-box">
                    <AdminBarChart/>
                </div>
            </div>
        </>
    )
}

export default AdminMain