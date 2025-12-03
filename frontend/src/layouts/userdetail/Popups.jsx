import { useEffect,useState } from "react"
import { locationCoordExchange, selectPopupStoreDetails } from "../../api/PopupStoreAPI"
import { useParams } from "react-router-dom";
import { BrowserRouter, Link, Route, Routes} from "react-router-dom";
import PPStyle from "./Popups.module.css"
import PopupInfo from "../../components/pupupinfo/PopupInfo";
import { MidComp1,MidComp2 } from "../../components/user/usermain/MidComp";
import ReviewView from "../../components/pupupinfo/ReviewView";
import { logDataByPopupDetail } from "../../api/BehaviorAPI";
// import Footer from "../../components/user/Footer";
// import Blank from "../../components/user/usermain/Blank";
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
                        <Link to={`/popup-stores/${popupNo}`} className={PPStyle.imagebuttonsactive} style={{ textDecoration: 'none', color: 'red' }}>
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
                        <div className={PPStyle.reviewtitle}>후기</div>
                        <Link to={`/popup-stores/${popupNo}/review`} style={{textDecoration:"none",color:"inherit"}}><div>후기작성하기</div></Link>
                     </div>
                    <ReviewView/>
                    <div style={{height:20}}></div>
                    <MidComp1/>
                    <div style={{height:20}}></div>
                    <MidComp2/>
                    <div style={{height:30}}></div>
                    
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Popups