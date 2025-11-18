import { Link } from "react-router-dom"
import PSStyle from "./PopupComps.module.css"
import { useEffect,useState } from "react"
import { DndProvider, useDrag } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"



function PopupComp({popupstore,posterNo}){

    const posterUrl = `public/poster/poster_${posterNo}.png`

    const [{isDragging},drag,preview] = useDrag({
            type:'popup',
            item : {popupstore},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                
            })
            ,
            end : (item,monitor) =>{
                if(monitor.didDrop()){
                    console.log("드롭완료")
                }else{
                    console.log('드래그종료, 드롭 안됨',item)
                }
            }
        })

    


    


    
    
    return(
        <>
            
                <Link to={`/user/${popupstore.no}`} onClick={()=>{location.href(`/user/${popupstore.no}`)}}>
                <div className={PSStyle.back}>
                    <img src={posterUrl} alt={posterNo} className={PSStyle.img}/>
                    {/* <div className={PSStyle.layout} ref={drag}>
                        <div className={PSStyle.explain}>
                            <div className={PSStyle.name}>{popupstore.name}</div>
                            <div>{popupstore.location}</div>
                            <div>{popupstore.startDate} ~ {popupstore.endDate}</div>
                        </div>
                    </div> */}
                </div>
                </Link>
            
                        
            
        </>
    )
}

export default PopupComp