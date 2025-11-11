import { Link } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"
import { useEffect,useState } from "react"
import { insertFavorite } from "../api/FavoriteAPI"
import { useDrag, useDrop } from "react-dnd"


function PopupStores({popupstore,setIsDrag}){

        

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
                    console.log('드래그종료, 드롭 안됨',item.popupstore.no)
                }
            }
        })

        useEffect(()=>{
            setIsDrag(isDragging)
            console.log(isDragging)
        },[isDragging,setIsDrag])
    
    return(
        <>
            
                <Link to={`/user/${popupstore.no}`}>
                    <div className={PSStyle.layout} ref={drag}>
                        <div className={PSStyle.image}>{popupstore.no}</div>
                            <div className={PSStyle.explain}>
                                <div>{popupstore.name}</div>
                                <div className={PSStyle.small}>{popupstore.location}</div>
                                <div className={PSStyle.small}>{popupstore.startDate} ~ {popupstore.endDate}</div>
                            </div>
                    </div>
                </Link>
                        <div className={PSStyle.favorite}>♡</div>
            
        </>
    )
}

export default PopupStores