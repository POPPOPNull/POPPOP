import "../usermain/main.css";
import "./mapbody.css";
import { useEffect, useState } from "react";
import KakaoMap from "../../componenets/Map";

function MapBody (){

    const [coord, setCoord] = useState({
    lat: 37.5610,
    lng: 127.2111,
    });

    useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("현재 위치:", position.coords);
        },
        (error) => {
          console.error("현재 위치를 가져올 수 없습니다:", error);
        },
        {
            // 정확도향상
        enableHighAccuracy: true, // GPS 우선 사용
        timeout: 10000,           // 최대 10초 대기
        maximumAge: 0             // 캐시된 위치 사용 안 함
      }
      );
    }
    }, 
    []);

    return(
        <>
            <div className="user-main-layout">
                <div className="user-main">
                    <div className="map">
                    <KakaoMap props={coord}/>   
                    </div>
                  
                </div>
            </div>
        </>
    )
}

export default MapBody;