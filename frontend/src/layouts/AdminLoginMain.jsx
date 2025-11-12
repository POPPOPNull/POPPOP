import "./usermain/main.css"
import AdminLoginform from "../componenets/AdminLoginForm";

function AdminLogin (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                <AdminLoginform/>
                </div>
            </div>
            
        </>
    )
}

export default AdminLogin;