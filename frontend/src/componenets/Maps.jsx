import { useEffect } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";




function KakaoMap({props}){

    const key = process.env.REACT_APP_KAKAOMAP_KEY

    useKakaoLoader({
        appkey: key,
        libraries: ["clusterer", "drawing", "services"],
    })

    useEffect(()=>{
        console.log(props)   
    },[])


    return(
        <>
        <div>지도</div>
            <Map
                center={{lat:props.lat ,lng:props.lng}}
                style={{width:'900px',height:'600px'}}
                level={3}
            />
        </>
    )
}

export default KakaoMap

