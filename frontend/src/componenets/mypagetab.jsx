import React from "react";
import {NavLink} from 'react-router-dom';
import "./mypagetab.css"


function Tab() {

    return(
        <>
            <div className="tabdetails">
                <h1>마이페이지</h1>
                <div>
                    <ul className="tabs">
                        <li><NavLink to="/myinfo" style={({isActive})=> ({color: isActive ? "yellow" : "white",})}>회원정보</NavLink></li>
                        <li><NavLink to="/myreview" style={({isActive})=> ({color: isActive ? "yellow" : "white",})}>리뷰</NavLink></li>
                        <li><NavLink to="/myreservation" style={({isActive})=> ({color: isActive ? "yellow" : "white",})}>예약확인</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Tab;