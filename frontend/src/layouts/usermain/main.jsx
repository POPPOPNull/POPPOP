import "./main.css"

import Blank from "../../componenets/user/usermain/Blank";
import { BotComp } from "../../componenets/user/usermain/BotComp";

import TopComp from "../../componenets/user/usermain/TopComp";
import {useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryComp from "../../componenets/user/usermain/CategoryComp";
import { MidComp1, MidComp2 } from "../../componenets/user/usermain/MidComp";
// import Test from "../../pages/dndtest/DndTest";





function User (){





    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <Blank/>
                    <TopComp/>
                    {/* <Test/> */}
                    <DndProvider backend={HTML5Backend}>
                        <CategoryComp/>
                        <MidComp1/>
                        <MidComp2/>
                    </DndProvider>
                    
                    <BotComp/>

                    
                
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default User;