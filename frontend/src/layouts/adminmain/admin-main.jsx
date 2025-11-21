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
                    <div className="chart-header">
                        <p className="chart-title">플랫폼 성장 추이</p>
                        <button className="chart-button">기간설정</button>
                    </div>
                    <div className="admin-LineChart"><AdminLineChart/></div>
                </div>
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">유입 경로</p>
                        <button className="chart-button">기간설정</button>
                    </div>
                    <div className="admin-chart"><AdminChart height={200} width={400}/></div>
                </div>
            </div>
            <div className="admin-chart-layout">
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">차트 3 입니다.</p>
                        <button className="chart-button">기간설정</button>
                    </div>
                    <div className="admin-chart"><AdminLineChart/></div>
                </div>
                <div className="admin-chart-box">
                    <div className="chart-header">
                        <p className="chart-title">차트 4 입니다.</p>
                        <button className="chart-button">기간설정</button>
                    </div>
                    <div className="admin-chart"><AdminBarChart height={200} width={360}/></div>
                </div>
            </div>
        </>
    )
}

export default AdminMain