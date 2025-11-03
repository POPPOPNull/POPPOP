import "./admin-main.css"
import AdminKPI1 from "../../componenets/admin/adminKPI1"
import AdminChart from "../../componenets/admin/adminChart"
import AdminLineChart from "../../componenets/admin/adminLineChart"
import AdminBarChart from "../../componenets/admin/adminBarChart"
import AdminKPITotalLeft from "../../componenets/admin/adminKPITotalLeft"
import AdminKPITotalRight from "../../componenets/admin/adminKPITotalRight"

function AdminManagerMain (){
    return(
        <>
            <div className="adminKPI-layout">
                <div className="adminKPI-layout-up">
                    <AdminKPITotalLeft/>
                    <AdminKPITotalRight/>
                </div>
                <div className="adminKPI-layout-down">
                    <AdminKPI1/><AdminKPI1/><AdminKPI1/><AdminKPI1/>
                </div>
                
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">차트 1 입니다.</p>
                        <button className="chart-button">기간</button>
                    </div>
                    <div className="admin-chart"><AdminChart height={200} width={400}/></div>
                </div>
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">차트 2 입니다.</p>
                        <button className="chart-button">기간</button>
                    </div>
                    <div className="admin-chart"><AdminChart height={200} width={400}/></div>
                </div>
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">차트 3 입니다.</p>
                        <button className="chart-button">기간</button>
                    </div>
                    <div className="admin-chart"><AdminLineChart height={200} width={360}/></div>
                </div>
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">차트 4 입니다.</p>
                        <button className="chart-button">기간</button>
                    </div>
                    <div className="admin-chart"><AdminBarChart height={200} width={360}/></div>
                </div>
            </div>
        </>
    )
}

export default AdminManagerMain