import { useEffect,useState } from "react"
import { selectPopupStoreDetails } from "../../api/PopupStoreAPI"
import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";
import PPStyle from "./Popups.module.css"
import PopupInfo from "../../componenets/pupupinfo/PopupInfo";
import { MidComp1,MidComp2 } from "../../componenets/user/usermain/MidComp";
import UserReview from "../../componenets/user/userreview/UserReview";
import ReviewView from "../../componenets/pupupinfo/ReviewView";
import Footer from "../usermain/Footer";




function ReviewInsert(){

       const {popupNo} = useParams();
       const popupURL = `/public/poster/poster_${popupNo}.png`
   
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
                   <div className="main">
                       <div className="blank"></div>
                       <div className={PPStyle.poster}><img src={popupURL} alt={popupNo} /></div>
                       <div className={PPStyle.imagebuttonlayout}>
                           <Link to={`/popup-stores/${popupNo}`} className={PPStyle.imagebuttons} style={{ textDecoration: 'none', color: 'inherit' }}>
                               정보
                           </Link>
                           <Link to={`/popup-stores/${popupNo}/review`} className={PPStyle.imagebuttonsactive} style={{ textDecoration: 'none', color: 'red' }}>
                               후기
                           </Link>
                       </div>
                       <div className={PPStyle.popupname}>{popup.name}</div>
                       <div className={PPStyle.popupduration}>{popup.startDate} ~ {popup.endDate}</div>
                       <div className={PPStyle.popuplocation}>{popup.location}</div>
                       <div>{popup.hashtags}</div>
                       <UserReview/>
                       
                       <div>후기</div>
                       <ReviewView/>
                       <MidComp1/>
                       <MidComp2/>
                       <Footer/>
                   </div>
               </div>
           </>
       )
}

export default ReviewInsert