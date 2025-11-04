import { useEffect, useState } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { locationCoordExchange } from "../../api/PopupStoreAPI";
import axios from "axios";




function KakaoMap({props}){

    const key = import.meta.env.VITE_KAKAOMAP_KEY

    const [places, setPlaces] = useState([]);
    const [markers, setMarkers] = useState([]);

    useKakaoLoader({
        appkey: key,
        libraries: ["clusterer", "drawing", "services"],
    })

    useEffect(() => {
    axios.get("/api/PopupStoreAPI")
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  }, []);

    useEffect(()=>{
        console.log(props)   
    },[])


    return(
        <>
        <div>지도</div>
            <Map
                center={{lat:props.lat ,lng:props.lng}}
                style={{width:'900px',height:'500px'}}
                level={3}
            >
            {markers.map((marker, idx) => (
            <Marker
                key={idx}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.name}
                />
            ))}
            </Map>
        </>
    )
}

export default KakaoMap

