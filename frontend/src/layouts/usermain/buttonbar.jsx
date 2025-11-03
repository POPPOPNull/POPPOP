import React from "react";
import "./buttonbar.css"
import { NavLink } from "react-router-dom";


function Buttons () {


    return(
        <>
            <div className="buttonbar-layout">
                <div className="buttonbar"><NavLink to="/user/search" style={{ color: "white", textDecoration: "none" }}>조회</NavLink></div>
                <div className="buttonbar"><NavLink to="/user/favorite" style={{ color: "white", textDecoration: "none" }}>관심</NavLink></div>
                <div className="buttonbar"><NavLink to="/maps" style={{ color: "white", textDecoration: "none" }}>주변</NavLink></div>
                <div className="buttonbar"><NavLink to="/myinfo" style={{ color: "white", textDecoration: "none" }}>마이페이지</NavLink></div>
            </div>
        </>    
    )
}

export default Buttons