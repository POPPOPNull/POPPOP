import { useEffect, useState } from "react"
import { selectPopupStoreDetails,locationCoordExchange } from "../../api/PopupStoreAPI"
import { useParams } from "react-router-dom"
import KakaoMap from "../usermain/Maps";
import PPStyle from "./PopupInfo.module.css"
import { MapMarker } from "react-kakao-maps-sdk";

function PopupInfo(){

     const {popupNo} = useParams();
    
        const [popup, setPopup] = useState({});
    
        const [coord, setCoord] = useState({
            lat:"",
            lng:""
        })
    
        useEffect(()=>{
            selectPopupStoreDetails(popupNo)
            .then(data=>{
                console.log("data",data)
                setPopup(data)
            })    
            console.log(popup.location)
    
            
        },[])
    
    
        useEffect(()=>{
    
            locationCoordExchange(popup.location)
            .then(data => {
                console.log(data)
                setCoord({
                    lat:data.documents[0].y,
                    lng:data.documents[0].x
                })
                console.log(coord)
            })
        },[popup])

    return(
        <>
            <div>{popup.no}의 상세페이지</div>
            <hr />
            <div>편의아이콘</div>
            <hr />
            <div>운영시간
                <div>
                    <br />
                    월 ~ 일 : {popup.openTime} - {popup.closeTime}
                </div>
            </div>
            <div className={PPStyle.intro}>팝업스토어 소개</div>
            <div className={PPStyle.introbox}>{popup.explanation}</div>
            <br />
            <KakaoMap props={coord}>
                <MapMarker position={coord} />
            </KakaoMap>
            <div className={PPStyle.locationcopy}>
                <div>{popup.location}</div>
                <div className={PPStyle.copybutton}>주소복사</div>
                </div>

            <div className={PPStyle.lowerbuttonlayout}>
                <div className={PPStyle.lowerbutton}>브랜드 홈페이지 링크</div>
                <div className={PPStyle.lowerbutton}>SNS 링크</div>
                <div className={PPStyle.lowerbutton}>예약</div>
            </div>

        </>
    )
}

export default PopupInfo;