import "./admin-main.css"
import AdminChart from "../../componenets/admin/adminChart"
import AdminLineChart from "../../componenets/admin/adminLineChart"
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

export default AdminMain