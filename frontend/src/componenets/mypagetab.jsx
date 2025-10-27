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
                        <li>회원정보</li>
                        <li>리뷰</li>
                        <li>예약확인</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Tab;