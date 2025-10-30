import React from "react";
import { useState } from "react";
import "./loginform.css"
import { Link } from "react-router-dom";

function LoginComponent() {

            const [username, setUsername] = useState('');
            const [password, setPassword] = useState('');

            const onChangeUsername = e => setUsername(e.target.value);
            const onChangePassword = e => setPassword(e.target.value);

            const onClickHandler = () => {
                alert(`username : ${username} \n password: ${password}`);
                setUsername('');
                setPassword('');
            }

            return(
                <>
                <div className="loginform">
                    <input className="inputlogin"
                        type="text"
                        name="username"   
                        placeholder="아이디"
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <br/>   
                    <input className="inputlogin"
                        type="password"
                        name="password"   
                        placeholder="비밀번호"
                        value={password}
                        onChange={onChangePassword}
                    />

                    <br/>
                    <div>
                        <Link className="loginhelp">아이디 찾기 </Link>
                        <span>|</span>
                        <Link className="loginhelp"> 비밀번호 찾기 </Link>
                        <span>|</span>
                        <Link className="loginhelp"> 회원가입</Link>
                    </div>
                    <br/>
                    <button className="btnlogin" onClick={onClickHandler}>로그인</button>
                </div>
                </>
            );
        }

export default LoginComponent;