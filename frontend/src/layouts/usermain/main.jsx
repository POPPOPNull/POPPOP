import "./main.css"

import CategoryComp from "../../componenets/usermain/CategoryComp";
import Blank from "../../componenets/usermain/Blank";
import { BotComp } from "../../componenets/usermain/BotComp";

import TopComp from "../../componenets/usermain/TopComp";
import { MidComp1,MidComp2 } from "../../componenets/usermain/MidComp";
import {useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { memo } from "react";
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