import "./main.css"

import Blank from "../../componenets/user/usermain/Blank";
import { BotComp } from "../../componenets/user/usermain/BotComp";

import TopComp from "../../componenets/user/usermain/TopComp";
import {useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryComp from "../../componenets/user/usermain/CategoryComp";
import { MidComp1, MidComp2 } from "../../componenets/user/usermain/MidComp";
import Container from "./TestContainer";





function Test (){





    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <h1>dnd 테스트 페이지
                    </h1>
                    <TopComp/>
                    
                    <DndProvider backend={HTML5Backend}>
                        <Container/>
                    </DndProvider>
                    
                    <BotComp/>

                    
                
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
            
        </>
    )
}

export default Test;