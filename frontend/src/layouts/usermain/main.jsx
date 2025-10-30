import "./main.css"
import DragComp from "../../componenets/movingUI";
import TopComp from "../../componenets/TopComp";
import {MidComp1,MidComp2} from "../../componenets/MidComp";
import CategoryComp from "../../componenets/CategoryComp";
import Blank from "../../componenets/Blank";
import { BotComp } from "../../componenets/BotComp";




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