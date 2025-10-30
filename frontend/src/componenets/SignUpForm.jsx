import "./signupform.css"

function SignUpComponent() {

            return(
                <>
                <div className="signupform">
                    <h1>회원가입</h1>
                    <div className="id">
                        <input className="inputsignup"
                            type="text"
                            name="userid"   
                            placeholder="아이디"
                        />
                        <button className="idcheck">확인</button>
                    </div>
                    <br/>   
                    <input className="inputsignup"
                        type="password"
                        name="password"   
                        placeholder="비밀번호"
                    />
                    <br/>
                    <input className="inputsignup"
                        type="password"
                        name="password"   
                        placeholder="비밀번호확인"
                    />
                    <br/>
                    <input className="inputsignup"
                        type="text"
                        name="username"   
                        placeholder="이름"
                    />
                    <br/>
                    <input className="inputsignup"
                        type="number"
                        name="bithday"   
                        placeholder="생년월일"
                    />
                    <br/>
                    <input className="inputsignup"
                        type="number"
                        name="phone"   
                        placeholder="전화번호"
                    />
                    <br/>
                    <button className="btnsignup">가입</button>
                </div>
                </>
            );
        }

export default SignUpComponent;