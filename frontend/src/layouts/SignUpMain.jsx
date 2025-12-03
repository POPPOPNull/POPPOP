import "./usermain/main.css"
import Signupform from "../components/SignUpForm";
import SignUpConsent from "../components/SignUpConsent";
import { useState } from "react";

function Login (){

    const [step, setStep] = useState(1);

    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="signup-page">
                        <div className="signup-steps">
                            <div className={`step-item ${step === 1 ? "active" : ""}`}>
                                <div className="step-circle">1</div>
                                <div className="step-label">약관 동의</div>
                            </div>

                            <div className={`step-item ${step === 2 ? "active" : ""}`}>
                                <div className="step-circle">2</div>
                                <div className="step-label">회원가입</div>
                            </div>
                        </div>
                    {step === 1 && (
                        <SignUpConsent
                        onNext={() => setStep(2)}
                        />
                    )}
                    {step === 2 && <Signupform />}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Login;