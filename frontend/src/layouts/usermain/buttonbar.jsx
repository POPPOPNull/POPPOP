import React, { useEffect, useRef, useState } from "react";
import "./buttonbar.css"
import { NavLink } from "react-router-dom";
import { useDrop } from "react-dnd";
import { insertFavorite } from "../../api/FavoriteAPI";

function Favorite({item,children}){

    const ref = useRef(null)

    const [messege, setMessesge] = useState("")
    const [style , setStyle] = useState("modal")

    

      
    const [,drop]=useDrop({
        accept:'popup',
        hover(item){
            console.log("호버중")
            console.log(item.popupstore.no)
        },
        drop(item){
            console.log("아이템",item.popupstore.no)
            insertFavorite(item.popupstore.no)
            .then(
                ()=>{
                    // alert("찜 목록에 추가되었습니다.")
                    setMessesge("관심 목록에 추가되었습니다.")
                    setStyle("modalview")
                    setTimeout(()=>{
                        setStyle("modal")
                    },500)
                }
            )
            .catch(
                ()=>{
                    // alert("찜목록에 추가할 수 없어요.")
                    setMessesge("이미 추가된 팝업스토어에요.")
                    setStyle("modalview")
                    setTimeout(()=>{
                        setStyle("modal")
                    },500)
                }
            )
        }
        
    })
    
    return(
        <div ref={drop}>
            {children}
            <div className={style}>{messege}</div>
        </div>
        
    )
}

function Buttons () {


    

    
    

    


    return(
        <>
            <div className="buttonbar-layout">
                
                
                    <NavLink to="/popup-stores/search" style={{ color: "white", textDecoration: "none" }} className="buttonback" >
                    <div className="buttonbar">
                    <img className={location.pathname=="/popup-stores/search"?"imgred":'img'} src="/icons/search.png" style={{width:20,height:20}} alt="조회" />
                    <div style={location.pathname=="/popup-stores/search"?{color:"#f4002d"}:{color:'white'}}>조회</div>
                    </div>
                    </NavLink>
                <Favorite>
                        
                        <NavLink to="/popup-stores/favorite" style={{ color: "white", textDecoration: "none" }} className="buttonback">
                        <div className="buttonbar">
                        <img className={location.pathname=="/popup-stores/favorite"?"imgred":'img'} src="/icons/favorite.png" style={{width:20,height:20}} alt="관심" />
                        <div style={location.pathname=="/popup-stores/favorite"?{color:"#f4002d"}:{color:'white'}}>관심</div>
                        </div>
                        </NavLink>
                </Favorite>
                    <NavLink to="/popup-stores/maps" style={{ color: "white", textDecoration: "none" }} className="buttonback">
                <div className="buttonbar">
                    <img className={location.pathname=="/popup-stores/maps"?"imgred":'img'} src="/icons/map.png" style={{width:20,height:20}} alt="주변" />
                    <div style={location.pathname=="/popup-stores/maps"?{color:"#f4002d"}:{color:'white'}}>주변</div>
                    </div>
                    </NavLink>
                    <NavLink to="/myinfo" style={{ color: "white", textDecoration: "none" }} className="buttonback">
                <div className="buttonbar">
                    <img className={location.pathname=="/myinfo"||location.pathname=="/myreservation"||location.pathname=="/myreview"?"imgred":'img'} src="/icons/login.png" style={{width:20,height:20}} alt="마이페이지" />
                    <div style={location.pathname=="/myinfo"||location.pathname=="/myreservation"||location.pathname=="/myreview"?{color:"#f4002d"}:{color:'white'}}>마이페이지</div>
                    </div>
                    </NavLink>
            </div>
        </>    
    )
}

export default Buttons