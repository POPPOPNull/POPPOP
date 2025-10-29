import { Link, useParams } from "react-router-dom"
import PSStyle from "./PopupStore.module.css"

Link

function PopupStores({popupstore}){

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
                        <div className={PSStyle.favorite}>♡</div>
                    </div>
                </Link>
            
        </>
    )
}

export default PopupStores