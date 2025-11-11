import React, { useRef } from "react";
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


    return(
        <>
            <div className="buttonbar-layout">
                <div className="buttonbar"><NavLink to="/user/search" style={{ color: "white", textDecoration: "none" }}>조회</NavLink></div>
                <Favorite>
                    <div className="buttonbar"><NavLink to="/user/favorite" style={{ color: "white", textDecoration: "none" }}>관심</NavLink></div>
                </Favorite>
                <div className="buttonbar"><NavLink to="/maps" style={{ color: "white", textDecoration: "none" }}>주변</NavLink></div>
                <div className="buttonbar"><NavLink to="/myinfo" style={{ color: "white", textDecoration: "none" }}>마이페이지</NavLink></div>
            </div>
        </>    
    )
}

export default Buttons