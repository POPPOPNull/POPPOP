<<<<<<< HEAD
import { useEffect, useRef, useState } from "react"
import PopupStores from "../../PopupStores"
import {selectFavoritePopupStoreById } from "../../../api/PopupStoreAPI"
import FPStyle from "./FP.module.css"
import { useDrag, useDrop } from "react-dnd"
import { deleteFavorite } from "../../../api/FavoriteAPI"

function NoFavorite(){
    return(
        <>
        <div className={FPStyle.nofavorite}>아직 관심 팝업이 없어요</div>
        </>
    )
}

=======
import { useEffect, useState } from "react"
import PopupStores from "../../PopupStores"
import {selectFavoritePopupStoreById } from "../../../api/PopupStoreAPI"
import FPStyle from "./FP.module.css"
>>>>>>> JWT/master



function FavoritePopups(){

        const [popupStores, setPopupStores] = useState([])
<<<<<<< HEAD
        const [id ,setId] = useState("user1")
        const [isDrag, setIsDrag] = useState(false)
=======
        const [id ,setId] = useState("user-geonwoo")
>>>>>>> JWT/master
    
        useEffect(()=>{
            selectFavoritePopupStoreById(id).then(data=>{
                console.log(data)
                setPopupStores(data)
<<<<<<< HEAD
            })     
        },[isDrag])  

        const [,drop] = useDrop({
            accept : 'popup',
            hover(item){
                console.log(item.popupstore.no,'삭제할래?')
            },
            drop(item){
                deleteFavorite(item.popupstore.no,"user1")
                console.log('삭제 완')
            }
            
        })
=======
            })
        },[])  
>>>>>>> JWT/master
    
    
    
    return(
        <>
<<<<<<< HEAD
            
            <div className={FPStyle.botlayout}>
                {popupStores.length==0?<NoFavorite/>:popupStores.map(popupstores =><PopupStores key={popupstores.no} popupstore={popupstores} setIsDrag={setIsDrag}/>)}
            </div>
                {isDrag&&<div className={FPStyle.dropdelete} ref={drop}>삭제</div>}
=======
            <div className={FPStyle.botlayout}>
                {popupStores.map(popupstore =><PopupStores key={popupstore.no} popupstore={popupstore}/>)}
            </div>
>>>>>>> JWT/master
        </>
    )
}

export default FavoritePopups;