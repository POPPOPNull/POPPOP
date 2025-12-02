import React, { useEffect, useRef, useState } from "react";
import "./buttonbar.css"
import { NavLink } from "react-router-dom";
import { useDrop } from "react-dnd";
import { insertFavorite } from "../../api/FavoriteAPI";

function Favorite({item,children}){

    const ref = useRef(null)

    

      
    const [,drop]=useDrop({
        accept:'popup',
        hover(item){
            console.log("호버중")
            console.log(item.popupstore.no,"user1")
        },
        drop(item){
            console.log("아이템",item.popupstore.no)
            insertFavorite(item.popupstore.no,"user1")
        }
        
    })
    
    return(
        <div ref={drop}>
            {children}
        </div>
    )
}

function Buttons () {

    const [mouseCoord,setMouseCoord] = useState({
        x:0,
        y:0
    })
    
    const onMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoord({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

    useEffect(()=>{
        console.log(mouseCoord)
    },[mouseCoord])


    return(
        <>
            <div className="buttonbar-layout">
                
                
                    <NavLink to="/popup-stores/search" style={{ color: "white", textDecoration: "none" }} className="buttonback" >
                    <div className="buttonbar" onClick={onMouse}>
                    <img className="img" src="public\icons\search.png" style={{width:20,height:20}} alt="조회"  />
                    <div>
                        조회
                    </div>
                    </div>
                    </NavLink>
                <Favorite>
                        
                        <NavLink to="/user/favorite" style={{ color: "white", textDecoration: "none" }} className="buttonback">
                    <div className="buttonbar"  onClick={onMouse}>
                        <img className="img" src="public\icons\favorite.png" style={{width:20,height:20}} alt="관심" />
                        <div>관심</div>
                        </div>
                        </NavLink>
                </Favorite>
                    <NavLink to="/popup-stores/maps" style={{ color: "white", textDecoration: "none" }} className="buttonback">
                <div className="buttonbar">
                    <img className="img" src="public\icons\map.png" style={{width:20,height:20}} alt="주변" />
                    <div>주변</div>
                    </div>
                    </NavLink>
                    <NavLink to="/myinfo" style={{ color: "white", textDecoration: "none" }} className="buttonback">
                <div className="buttonbar">
                    <img className="img" src="public\icons\login.png" style={{width:20,height:20}} alt="마이페이지" />
                    <div>마이페이지</div>
                    </div>
                    </NavLink>
            </div>
        </>    
    )
}

export default Buttons