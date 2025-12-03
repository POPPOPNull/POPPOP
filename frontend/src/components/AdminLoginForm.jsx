import React from "react";
import { useState } from "react";
import "./loginform.css"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/UseAuth';
import JwtAPI from '../api/JwtAPI';

function LoginComponent() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await JwtAPI.post('/auth/admin/login', { id, password });
            
            const token = response.data.accessToken;
            
            console.log("로그인 응답:", response);          // 전체 응답
            console.log("응답 body:", response.data);       // body 내용
            console.log("토큰:", token);
            
            login(token); 
            
            navigate('/admin'); // App.jsx의 RedirectBasedOnRole로 이동하여 역할 기반 리디렉션 수행

        } catch (error) {
            alert('Admin 로그인 실패');
            console.error(error);
        }
    };

            return(
                <>
                <form className="loginform" onSubmit={handleSubmit}>
                    <input className="inputlogin"
                        type="text"  
                        placeholder="admin 아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                    <br/>   
                    <input className="inputlogin"
                        type="password"
                        name="password"   
                        placeholder="admin 비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button className="btnlogin" type="submit">로그인</button>
                </form>
                </>
            );
        }

export default LoginComponent;