import { useEffect,useState } from "react"
import { locationCoordExchange, selectPopupStoreDetails } from "../../api/PopupStoreAPI"
import { useParams } from "react-router-dom";
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";
import PPStyle from "./Popups.module.css"
import PopupInfo from "../../componenets/pupupinfo/PopupInfo";
import { MidComp1,MidComp2 } from "../../componenets/user/usermain/MidComp";
import ReviewView from "../../componenets/pupupinfo/ReviewView";
import { logDataByPopupDetail } from "../../api/BehaviorAPI";
// import Footer from "../../componenets/user/Footer";
// import Blank from "../../componenets/user/usermain/Blank";
import Footer from "../usermain/Footer";


function Poster(){
    

}




function Popups(){

    const {popupNo} = useParams();

    const popupURL = `/public/poster/poster_${popupNo}.png`
    console.log("popupUrl:",popupURL)

    const [popup, setPopup] = useState({});

    // useEffect(()=>{
    //     selectPopupStoreDetails(popupNo)
    //     .then(data=>{
    //         console.log("data",data)
    //         setPopup(data)
    //     })    
        
        
    // },[])


    useEffect(()=>{
        const fetchData = async () => {
            const data = await selectPopupStoreDetails(popupNo)
            setPopup(data)

            await logDataByPopupDetail(popupNo)

        }
        fetchData()
    },[])






    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="blank"></div>
                    <div className={PPStyle.poster}>
                        <img src={popupURL} alt={popupNo} />
                    </div>
                    <div className={PPStyle.imagebuttonlayout}>
                        <Link to={`/popup-stores/${popupNo}`} className={PPStyle.imagebuttons} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div>정보</div>
                        </Link>
                         <Link to={`/popup-stores/${popupNo}/review`} className={PPStyle.imagebuttons} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        <Link to={`/popup-stores/${popupNo}/review`} style={{textDecoration:"none",color:"inherit"}}><div>후기작성하기</div></Link>
                     </div>
                    <ReviewView/>
                    <MidComp1/>
                    <MidComp2/>
                    <div style={{height:30}}></div>
                    
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Popups