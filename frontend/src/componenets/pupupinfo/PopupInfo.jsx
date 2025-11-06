import { useEffect, useState } from "react"
import { selectPopupStoreDetails,locationCoordExchange } from "../../api/PopupStoreAPI"
import { useParams } from "react-router-dom"
import KakaoMap from "../user/usermain/Maps";
import PPStyle from "./PopupInfo.module.css"
import { MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";

function PopupInfo(){

     const {popupNo} = useParams();
    
        const [popup, setPopup] = useState({});


        const [coord, setCoord] = useState({
            lat:"",
            lng:""
        })
        
    


        useEffect(()=>{
            const fetchData = async () =>{
                const data = await selectPopupStoreDetails(popupNo)
                const location = data.location
                setPopup(data)
                

                const data2 = await locationCoordExchange(location)
                setCoord({
                    lng:data2.documents[0].x,
                    lat:data2.documents[0].y
                })

                
            }
            fetchData();
        },[])

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
                <Link to={`/reservations/${popup.no}`}>
                    <div className={PPStyle.lowerbutton}>예약</div>
                </Link>
            </div>

        </>
    )
}

export default PopupInfo;