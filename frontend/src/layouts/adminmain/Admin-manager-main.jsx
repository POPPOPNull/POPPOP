import "./Admin-main.css"
import AdminChart from "../../componenets/admin/AdminChart"
import AdminLineChart from "../../componenets/admin/AdminLineChart"
import AdminBarChart from "../../componenets/admin/adminBarChart"
import KPIData from "../../componenets/admin/adminKPIData"
import AdminBarChart2 from "../../componenets/admin/adminBarChart2"

function AdminMain (){
    return(
        <>
            <div className="adminKPI-layout">
                <KPIData/>                
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <div className="line-chart-header">
                        <span>플랫폼 성장 추이</span>
                        <div
                            style={{ display: 'flex', gap: '10px'}}
                        >
                            <button className="admin-chart-btn">일별</button>
                            <button className="admin-chart-btn">월별</button>
                        </div>
                    </div>
                    <AdminLineChart/>
                </div>
                <div className="admin-chart-box">
                    <AdminChart/>
                </div>
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <AdminBarChart2/>
                </div>
                <div className="admin-chart-box">
                    <AdminBarChart/>
                </div>
            </div>
        </>
    )
}

export default AdminMain