import { useEffect,useState } from "react"
import { locationCoordExchange, selectPopupStoreDetails } from "../../api/PopupStoreAPI"
import { useParams } from "react-router-dom";
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";
import PPStyle from "./Popups.module.css"
import PopupInfo from "../../componenets/pupupinfo/PopupInfo";
import { MidComp1,MidComp2 } from "../../componenets/user/usermain/MidComp";
import ReviewView from "../../componenets/pupupinfo/ReviewView";




function Popups(){

    const {popupNo} = useParams();

    const [popup, setPopup] = useState({});

    useEffect(()=>{
        selectPopupStoreDetails(popupNo)
        .then(data=>{
            console.log("data",data)
            setPopup(data)
        })    
        console.log(popup.location)
    },[])







    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <div className={PPStyle.poster}>이미지준비중</div>
                    <div className={PPStyle.imagebuttonlayout}>
                        <Link to={`/user/${popupNo}`} className={PPStyle.imagebuttons}>
                            <div>정보</div>
                        </Link>
                         <Link to={`/user/${popupNo}/review`} className={PPStyle.imagebuttons}>
                            후기
                        </Link>
                    </div>
                    <div className={PPStyle.popupname}>{popup.name}</div>
                    <div className={PPStyle.popupduration}>{popup.startDate} ~ {popup.endDate}</div>
                    <div className={PPStyle.popuplocation}>{popup.location}</div>
                    <div>{popup.hashtags}</div>
                    <PopupInfo/>
                    <div className={PPStyle.reviewbtns}>
                        <div>후기</div>
                        <Link to={`/user/${popupNo}/review`}><div>후기작성하기</div></Link>
                     </div>
                    <ReviewView/>
                    <MidComp1/>
                    <MidComp2/>
                    <div className="footer">푸터자리입니다.</div>
                </div>
            </div>
        </>
    )
}

export default Popups