import "./admin-members.css"
import AdminSearchBar from "../../componenets/admin/adminSearchBar"
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