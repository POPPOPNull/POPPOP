import React, { useState,useEffect } from "react";
import "./header.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";


function Header(){

    const [isAuthorized,setIsAuthorized] = useState(false)

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

    useEffect(() => {
        const savedToken = sessionStorage.getItem('accessToken');
        if (savedToken) {
          const payload = parseJwt(savedToken);
          if (payload) {
            console.log("아이디",payload.id)
            setIsAuthorized(true)
          } else {
            sessionStorage.removeItem('accessToken');
            
          }
        }else{
            console.log("아이디 X")
            setIsAuthorized(false)
        }
        
      }, [isAuthorized]);


    const [style, setStyle] = useState({
        display : "none"
    })

    const [transition,setTransition] = useState("menu")
    
    const onClickBurger = () => {
        setTransition("menuactive")
        setStyle({
            display:"flex"
        })
    }
    const onClickX = () =>{
        setTransition("menu")
        setStyle({
            display:"none"
        })
    }

    const { logout } = useAuth();
        const navigate = useNavigate();
    
        const handleLogout = () => {
        
        alert("로그아웃되었습니다.");
    
        logout();
    
      };
    

    return(
        <>
            <div className="header"/>
            <div className="logo">
                <NavLink to="/" style={{ color: "#f4002d", textDecoration: "none" }}>POPPOP</NavLink>
                <div className="hamburger">
                    <img src="..\icons\menu-burger.png" alt="" style={{width:20,height:25}} onClick={onClickBurger}/>
                </div>
            </div>
            <div className="back" style={style}  onClick={onClickX}></div>
            <div className={transition} >

                <div className="menutop">
                    <div className="menulogo">POPPOP</div>
                    <div className="xbutton">
                        <img src="..\icons\cross.png" alt="" className="x" onClick={onClickX} />
                    </div>
                </div>


                    <div className="menus">
                        <NavLink to="/popup-stores/search" className="a">POPUP<span className="b">검색 조회</span></NavLink>
                        <NavLink to="/popup-stores/maps" className="a">MAP<span className="b">내 주변 팝업스토어</span></NavLink>
                        <NavLink to="/popup-stores/favorite" className="a">MY FAVORITE<span className="b">관심 목록</span></NavLink>
                        {/* <a href="" className="a">POPUP<span className="b">검색 조회</span></a> */}
                        <hr/>
                        <br />
                        {isAuthorized?<NavLink to="/myinfo" className="a" style={{fontSize:16}}>마이페이지</NavLink>:<NavLink to="/auth/login" className="a" style={{fontSize:16}}>회원가입</NavLink>}
                        {isAuthorized?<NavLink to="/" onClick={handleLogout} className="a" style={{fontSize:16}}>로그아웃</NavLink>:<NavLink to="/auth/login" className="a" style={{fontSize:16}}>로그인</NavLink>}
                    </div>

                    
            </div>
            

            
            
            
        </>
    )
}

export default Header;