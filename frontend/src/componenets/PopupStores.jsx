import { Link } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"
import { useEffect,useState } from "react"
import { insertFavorite } from "../api/FavoriteAPI"
import { useDrag, useDrop } from "react-dnd"


<<<<<<< HEAD
function PopupStores({popupstore,setIsDrag}){

        
=======
function PopupStores({popupstore}){
>>>>>>> JWT/master

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
<<<<<<< HEAD
                    console.log('드래그종료, 드롭 안됨',item.popupstore.no)
=======
                    console.log('드래그종료, 드롭 안됨',item)
>>>>>>> JWT/master
                }
            }
        })

<<<<<<< HEAD
        useEffect(()=>{
            setIsDrag(isDragging)
        },[isDragging,setIsDrag])
=======

        


    

    const [favorite, setFavorite] =useState({
        memberId:"gunwoo",
        popupNo:null
    })
    
    const onClickFavorite = ()=>{
        setFavorite({
            memberId:"user-geonwoo",
            popupNo:popupstore.no
        })
        console.log(popupstore.no,favorite)
        insertFavorite(popupstore.no,favorite)
    }

>>>>>>> JWT/master
    
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
<<<<<<< HEAD
                        <div className={PSStyle.favorite}>♡</div>
=======
                        <div className={PSStyle.favorite} onClick={onClickFavorite}>♡</div>
>>>>>>> JWT/master
            
        </>
    )
}

export default PopupStores