import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";


function KakaoMap({ popupStores=[] }){

    const key = import.meta.env.VITE_KAKAOMAP_KEY

    const navigate = useNavigate();

    useKakaoLoader({ 
        appkey: key
    });

    const [currentPos, setCurrentPos] = useState({
        lat: 37.5665,
        lng: 126.9780,
    });

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setCurrentPos({
                    lat: latitude,
                    lng: longitude,
                });

            },
            (error) => {
                console.error("현재 위치를 가져올 수 없습니다:", error);
            },{
            enableHighAccuracy: true, // GPS 우선 사용
            timeout: 10000,           // 최대 10초 대기
            maximumAge: 0             // 캐시된 위치 사용 안 함
            }
        );
    }, []);

    return(
        <>
        <div>지도</div>
            <Map
                center={currentPos}
                style={{width:'900px',height:'500px'}}
                level={3}
            >
            <MapMarker 
                position={currentPos}
                image={{src:"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    size:{width:28,height:40,},
                }}  
            />
            {popupStores.map((store) => (
                <MapMarker
                    key={store.popupNo}
                    position={{
                        lat: parseFloat(store.latitude),
                        lng: parseFloat(store.longitude),
                    }}
                    title={store.name}
                    onClick={() => {
                        navigate(`/popup-stores/${store.popupNo}`);
                    }}
                />
            ))}                
            </Map>
        </>
    )
}
export default KakaoMap

