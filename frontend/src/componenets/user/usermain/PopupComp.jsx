import { Link } from "react-router-dom"
import PSStyle from "./PopupComps.module.css"
import { useEffect,useState } from "react"
import { DndProvider, useDrag } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"



function PopupComp({popupstore,id}){

    const [{isDragging},drag,preview] = useDrag({
        type:'popup',
        item : {id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    


    


    
    
    return(
        <>
            
                <Link to={`/user/${popupstore.no}`} className={PSStyle.back} onClick={()=>{window.location.replace(`/user/${popupstore.no}`)}}>
                    <div className={PSStyle.layout}>
                        <div className={PSStyle.image}>{popupstore.no}</div>
                            <div className={PSStyle.explain}>
                                <div className={PSStyle.name}>{popupstore.name}</div>
                                <div>{popupstore.location}</div>
                                <div>{popupstore.startDate} ~ {popupstore.endDate}</div>
                            </div>
                    </div>
                </Link>
            
                        
            
        </>
    )
}

export default PopupComp