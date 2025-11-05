import { useEffect, useState } from "react"
import PopupStores from "../../PopupStores"
import {selectFavoritePopupStoreById } from "../../../api/PopupStoreAPI"
import FPStyle from "./FP.module.css"



function FavoritePopups(){

        const [popupStores, setPopupStores] = useState([])
        const [id ,setId] = useState("user_geonwoo")
    
        useEffect(()=>{
            selectFavoritePopupStoreById(id).then(data=>{
                console.log(data)
                setPopupStores(data)
            })
        },[])  
    
    
    
    return(
        <>
            <div className={FPStyle.botlayout}>
                {popupStores.map(popupstore =><PopupStores key={popupstore.no} popupstore={popupstore}/>)}
            </div>
        </>
    )
}

export default FavoritePopups;