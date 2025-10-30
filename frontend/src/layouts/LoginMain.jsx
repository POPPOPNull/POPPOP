import "./usermain/main.css"
import Loginform from "../componenets/LoginForm";

function Login (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                <Loginform/>
                </div>
            </div>
            
        </>
    )
}

export default Login;