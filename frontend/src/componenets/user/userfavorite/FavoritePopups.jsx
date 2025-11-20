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




function FavoritePopups(){

        const [popupStores, setPopupStores] = useState([])
        const [id ,setId] = useState("")
        const [isDrag, setIsDrag] = useState(false)
        const [isDrop, setIsDrop] = useState(false)
    
        useEffect(()=>{
            selectFavoritePopupStoreById(id).then(data=>{
                console.log(data)
                setPopupStores(data)
            })     
        },[])

        const [,drop] = useDrop({
            accept : 'popup',
            hover(item){
                console.log(item.popupstore.no,'삭제할래?')
            },
            drop(item){
                deleteFavorite(item.popupstore.no)
                console.log('삭제 완')
                setIsDrop(!isDrop)
            }
            
        })
    
    
    
    return(
        <>
            
            <div className={FPStyle.botlayout}>
                {popupStores.length==0?<NoFavorite/>:popupStores.map(popupstores =><PopupStores key={popupstores.no} popupstore={popupstores} posterNo={popupstores.no} setIsDrag={setIsDrag}/>)}
            </div>
                {isDrag&&<div className={FPStyle.dropdelete} ref={drop}>삭제</div>}
        </>
    )
}

export default FavoritePopups;