import { useEffect, useState } from "react"
import BCStyle from "./MidComp.module.css"
import { selectAllPopupStore, selectPopupRandomly } from "../../../api/PopupStoreAPI"
import PopupStores from "../../PopupStores"
import { Link } from "react-router-dom"



export function BotComp() {

    const [isDrag,setIsDrag] = useState(false)
    const [popupStores, setPopupStores] = useState([])

    useEffect(()=>{
        const fetchData = async () =>{
            const data = await selectAllPopupStore()
            const length = data.length

            const data2 = await selectPopupRandomly(10,length)
            setPopupStores(data2)
        }
        fetchData()
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
                {popupStores.map(popupstore =><PopupStores key={popupstore.no} popupstore={popupstore} setIsDrag={setIsDrag} posterNo={popupstore.no}/>)}
            </div>
            <Link to={"/user/search"}>
                <div className={BCStyle.more}>더보기</div>
            </Link>
        </>
    )
}