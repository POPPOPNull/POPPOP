import { useEffect,useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";




function KakaoMap({props}){

    const key = import.meta.env.VITE_KAKAOMAP_KEY

    const [center,setCenter] = useState({
        lat: null,
        lng: null
    })
    
    useKakaoLoader({
        appkey: key,
        libraries: ["clusterer", "drawing", "services"],
    })

    useEffect(()=>{
        setCenter(
            {lat:props.lat,lng:props.lng}
        )  
        console.log(center)
    },[props])


    return(
        <>
            <Map
                center={{lat:props.lat ,lng:props.lng}}
                style={{width:'900px',height:'600px'}}
                level={3}
            >
                <MapMarker position={center}/>
            </Map>
        </>
    )
}

export default KakaoMap

