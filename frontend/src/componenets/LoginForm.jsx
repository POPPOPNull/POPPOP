import React from "react";
import { useState } from "react";
import "./loginform.css"
<<<<<<< HEAD
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
=======
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/UseAuth';
import JwtAPI from '../api/JwtAPI';
import SignUpMain from "../pages/SignUp";

function LoginComponent() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const parseJwt = (token) => {
        try {
            const base64Payload = token.split('.')[1];
            const payload = JSON.parse(atob(base64Payload));
            return payload;
        } catch (e) {
        console.error('토큰 파싱 실패', e);
        return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await JwtAPI.post('/auth/login', { id, password });
            
            console.log("로그인 응답:", response);          // 전체 응답
            console.log("응답 body:", response.data);       // body 내용

            const token = response.data.accessToken;
            
            console.log("토큰:", {token});
            localStorage.setItem('token', token);

            console.log(localStorage.getItem('token'));

            login(token); 
            
            const payload = parseJwt(token);
            
    const userRole = payload?.role || payload?.roles || payload?.authorities;

    if (userRole) {
      
      const roleStr = Array.isArray(userRole) ? userRole[0] : userRole;
      if (roleStr === 'MANAGER') navigate('/manager');
      else if (roleStr === 'ADMIN') navigate('/admin');
      else if (roleStr === 'USER') navigate('/');
      else navigate('/');
    } else {
            navigate('/'); // App.jsx의 RedirectBasedOnRole로 이동하여 역할 기반 리디렉션 수행
    }

        } catch (error) {
            alert('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
            console.error(error);
        }
    };

            return(
                <>
                <form className="loginform" onSubmit={handleSubmit}>
                    <input className="inputlogin"
                        type="text"  
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
>>>>>>> JWT/master
                    />
                    <br/>   
                    <input className="inputlogin"
                        type="password"
                        name="password"   
                        placeholder="비밀번호"
                        value={password}
<<<<<<< HEAD
                        onChange={onChangePassword}
=======
                        onChange={(e) => setPassword(e.target.value)}
                        required
>>>>>>> JWT/master
                    />

                    <br/>
                    <div>
                        <Link className="loginhelp">아이디 찾기 </Link>
                        <span>|</span>
                        <Link className="loginhelp"> 비밀번호 찾기 </Link>
                        <span>|</span>
<<<<<<< HEAD
                        <Link className="loginhelp"> 회원가입</Link>
                    </div>
                    <br/>
                    <button className="btnlogin" onClick={onClickHandler}>로그인</button>
                </div>
=======
                        <Link to="/user/signup" className="loginhelp"> 회원가입</Link>
                    </div>
                        <Link to="/manager/signup" className="managerJoin">Biz 회원가입</Link>
                    <br/>
                    <button className="btnlogin" type="submit">로그인</button>
                </form>
>>>>>>> JWT/master
                </>
            );
        }

export default LoginComponent;