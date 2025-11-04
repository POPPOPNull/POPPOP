import { useEffect, useState } from "react"
import BCStyle from "./MidComp.module.css"
import { selectAllPopupStore } from "../../../api/PopupStoreAPI"
import PopupStores from "../../PopupStores"


export function BotComp() {

    const [popupStores, setPopupStores] = useState([])

    useEffect(()=>{
        selectAllPopupStore().then(data=>{
            console.log(data)
            setPopupStores(data)
        })
    },[])




    return(
        <>
            <div className={BCStyle.explain}>오늘 방문 가능한 팝업스토어</div>
            <div className={BCStyle.datelayout}>
                <div className={BCStyle.date}>today</div>
                <div className={BCStyle.date}>today+1</div>
                <div className={BCStyle.date}>today+2</div>
                <div className={BCStyle.date}>today+3</div>
                <div className={BCStyle.date}>today+4</div>
                <div className={BCStyle.date}>today+5</div>
                <div className={BCStyle.date}>today+6</div>
            </div>
            <div className={BCStyle.botlayout}>
                {popupStores.map(popupstore =><PopupStores key={popupstore.no} popupstore={popupstore}/>)}
            </div>
        </>
    )
}