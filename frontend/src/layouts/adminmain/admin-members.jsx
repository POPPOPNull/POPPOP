import "./admin-members.css"
import "../../componenets/manager/mypopup/mypopup.css"
import AdminKPI1 from "../../componenets/admin/adminKPI1"
import AdminSearchBar from "../../componenets/admin/adminSearchBar"
import AdminChart from "../../componenets/admin/adminChart"
import AdminLineChart from "../../componenets/admin/adminLineChart"
import AdminBarChart from "../../componenets/admin/adminBarChart"
import AdminKPITotalLeft from "../../componenets/admin/adminKPITotalLeft"
import AdminKPITotalRight from "../../componenets/admin/adminKPITotalRight"
import AdminMemberList from "../../componenets/admin/adminMemberList"

function AdminMembers (){
    return(
        <>
        <div className="admin-main-layout">
            <h1 className="admin-main-text">회원 목록</h1>
                <AdminSearchBar/>
                
            <div className="mp-card">
                <div className="mp-table">
                    <div className="mp-thead">
                        <div>아이디</div>
                        <div>이름</div>
                        <div>연락처</div>
                        <div>이메일</div>
                        <div>성별</div>
                        <div className="center">생년월일</div>
                    </div>

                    <AdminMemberList/>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default AdminMembers