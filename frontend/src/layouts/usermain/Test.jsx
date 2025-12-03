import "./main.css"

import Blank from "../../components/user/usermain/Blank";
import { BotComp } from "../../components/user/usermain/BotComp";

import TopComp from "../../components/user/usermain/TopComp";
import {useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryComp from "../../components/user/usermain/CategoryComp";
import { MidComp1, MidComp2 } from "../../components/user/usermain/MidComp";
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