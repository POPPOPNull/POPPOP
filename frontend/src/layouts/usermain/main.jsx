import "./main.css"

import CategoryComp from "../../componenets/usermain/CategoryComp";
import Blank from "../../componenets/usermain/Blank";
import { BotComp } from "../../componenets/usermain/BotComp";

import TopComp from "../../componenets/usermain/TopComp";
import { MidComp1,MidComp2 } from "../../componenets/usermain/MidComp";




function User (){
    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <Blank/>
                    <TopComp/>
                    <Blank/>
                    <CategoryComp/>
                    <MidComp1/>
                    <MidComp2/>
                    <BotComp/>

                    
                
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default User;