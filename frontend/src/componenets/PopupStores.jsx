import { Link } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"

Link

function PopupStores({popupstore}){
    return(
        <>
            
                <div className={PSStyle.layout}>
                    <div className={PSStyle.image}>이미지 준비중</div>
                    <div className={PSStyle.explain}>
                        <div>{popupstore.name}</div>
                        <div>{popupstore.location}</div>
                        <div>{popupstore.startDate} ~ {popupstore.endDate}</div>
                    </div>
                    <div className={PSStyle.favorite}>♡</div>
                    
                    
                </div>
            
        </>
    )
}

export default PopupStores