import "./usermain/main.css"
import ManagerSignupform from "../componenets/ManagerSignUpForm";

function Login (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <ManagerSignupform/>
                </div>
            </div>
            
        </>
    )
}

export default Login;