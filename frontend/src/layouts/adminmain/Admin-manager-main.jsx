import "./Admin-main.css"
import AdminBarChart from "../../componenets/admin/adminBarChart"
import AdminBarChart2 from "../../componenets/admin/adminBarChart2"
import AdminManagerKPIData from "../../componenets/admin/AdminManagerKPIData"
import AdminManagerLineChart from "../../componenets/admin/AdminManagerLineChart"
import AdminManagerChart from "../../componenets/admin/AdminManagerChart"

function AdminManagerMain (){
    return(
        <>
            <div className="adminKPI-layout">
                <AdminManagerKPIData/>
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <div className="line-chart-header">
                        <span>팝업 등록/승인 추이</span>
                        <div
                            style={{ display: 'flex', gap: '10px'}}
                        >
                            <button className="admin-chart-btn">일별</button>
                            <button className="admin-chart-btn">월별</button>
                        </div>
                    </div>
                    <AdminManagerLineChart/>
                </div>
                <div className="admin-chart-box">
                    <AdminManagerChart/>
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

export default AdminManagerMain