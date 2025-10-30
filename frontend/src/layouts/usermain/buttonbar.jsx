import React from "react";
import "./buttonbar.css"
import { NavLink } from "react-router-dom";


function Buttons () {


    return(
        <>
            <div className="buttonbar-layout">
                <div className="buttonbar">조회</div>
                <div className="buttonbar">관심</div>
                <div className="buttonbar"><NavLink to="/maps" style={{ color: "white", textDecoration: "none" }}>주변</NavLink></div>
                <div className="buttonbar"><NavLink to="/mypage" style={{ color: "white", textDecoration: "none" }}>마이페이지</NavLink></div>
            </div>
        </>    
    )
}

export default Buttons