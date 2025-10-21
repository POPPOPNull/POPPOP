import React from "react";
import "./buttonbar.css"


function Buttons () {


    return(
        <>
            <div className="buttonbar-layout">
                <div className="buttonbar">조회</div>
                <div className="buttonbar">관심</div>
                <div className="buttonbar">주변</div>
                <div className="buttonbar">마이페이지</div>
            </div>
        </>    
    )
}

export default Buttons