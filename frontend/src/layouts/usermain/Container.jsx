import { useCallback, useState } from "react"
import CategoryComp from "../../components/user/usermain/CategoryComp"
import { MidComp1, MidComp2 } from "../../components/user/usermain/MidComp"
import MovableComponent from "./MovableComponent"





function Container(){

    const [components,setComponents] = useState([
        {id : 1, content : <CategoryComp/>},
        {id : 2, content : <MidComp1/>},
        {id : 3, content : <MidComp2/>}
    ])

    const moveComponent = useCallback((from,to) => {
        setComponents((prev) => {
            const updated = [...prev]
            const [moved] = updated.splice(from,1)
            updated.splice(to,0,moved)
            return updated
        })
    },[])

    return(
        <>
        <div>
            {components.map((item,index) => (
            <MovableComponent
                key = {item.id}
                id = {item.id}
                index = {index}
                moveComponent={moveComponent}
            >
                {item.content}
                <div style={{height:20}}></div>
            </MovableComponent>
        ))}
            
        </div>
        </>
    )
}

export default Container