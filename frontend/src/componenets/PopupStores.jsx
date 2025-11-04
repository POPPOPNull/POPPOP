import { Link } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"
import { useEffect,useState } from "react"
import { insertFavorite } from "../api/FavoriteAPI"

Link

function PopupStores({popupstore}){
    

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

    
    return(
        <>
            
                <Link to={`/user/${popupstore.no}`}>
                    <div className={PSStyle.layout}>
                        <div className={PSStyle.image}>{popupstore.no}</div>
                            <div className={PSStyle.explain}>
                                <div>{popupstore.name}</div>
                                <div>{popupstore.location}</div>
                                <div>{popupstore.startDate} ~ {popupstore.endDate}</div>
                            </div>
                    </div>
                </Link>
                        <div className={PSStyle.favorite} onClick={onClickFavorite}>♡</div>
            
        </>
    )
}

export default PopupStores