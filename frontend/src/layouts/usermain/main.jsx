import "./main.css"

import Blank from "../../components/user/usermain/Blank";
import { BotComp } from "../../components/user/usermain/BotComp";

import TopComp from "../../components/user/usermain/TopComp";
import {useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryComp from "../../components/user/usermain/CategoryComp";
import { MidComp1, MidComp2 } from "../../components/user/usermain/MidComp";
import Container from "./Container";
import ComponentContainer from "./TestContainer";
import Footer from "./Footer";
// import Test from "../../pages/dndtest/DndTest";





function User (){





    return(
        <>
            <div className="user-main-layout">
                <div className="main">
                    
                    <Blank/>
                    <TopComp/>
                    <div style={{height:20}}></div>
                    <Container/>
                    <div style={{height:20}}></div>
                    <BotComp/>
                    <Footer/>
                </div>
            </div>
            
        </>
    )
}

export default User;