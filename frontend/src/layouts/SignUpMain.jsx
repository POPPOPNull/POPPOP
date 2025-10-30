import "./usermain/main.css"
import Signupform from "../componenets/SignUpForm";

function Login (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <Signupform/>
                </div>
            </div>
            
        </>
    )
}

export default Login;