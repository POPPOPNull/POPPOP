import { Link } from "react-router-dom"
import PSStyle from "./PopupComps.module.css"
import { useEffect,useState } from "react"


function PopupComp({popupstore}){
    

    const [favorite, setFavorite] =useState({
        memberId:"gunwoo",
        popupNo:null
    })
    
    const onClickFavorite = ()=>{
        setFavorite({
            memberId:"gunwoo",
            popupNo:popupstore.no
        })
        console.log(popupstore.no,favorite)
        insertFavorite(popupstore.no,favorite)
    }
    
    return(
        <>
            
                <Link to={`/user/${popupstore.no}`} className={PSStyle.back}>
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