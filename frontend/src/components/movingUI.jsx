import React from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./aaa.css"

function DragComp(props){
    const pos = useSpring({x:0,y:0})
    const bindPos = useDrag((params) =>{
        pos.x.set(params.offset[0]);
        pos.y.set(params.offset[1])
    });

    return(
        <animated.div {...bindPos()} style = {
            {x : pos.x,
             y : pos.y
            }
        }>
            <div className="movingComp">움직이는컴포넌트</div>
        </animated.div>
    )
}

export default DragComp;