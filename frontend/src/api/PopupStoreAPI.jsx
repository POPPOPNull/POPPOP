import axios from "axios";

const restapikey = import.meta.env.VITE_KAKAOMAP_RESTAPI_KEY

const BACKEND_URL = 'http://localhost:8080';

// 전체 팝업스토어 조회
export function selectAllPopupStore(){
    return axios.get(`${BACKEND_URL}/popup-stores/lower`)
    .then(response=>response.data)
}

// 팝업스토어 상세조회
export function selectPopupStoreDetails(popupNo){
    return axios.get(`${BACKEND_URL}/popup-stores/${popupNo}`)
    .then(response=>response.data)
}

// 주소 -> 좌표 변환
export function locationCoordExchange(location){
    return axios.get(`https://dapi.kakao.com/v2/local/search/address?query=${location}`,{headers:{Authorization: 'KakaoAK'+' '+restapikey}})
    .then(response=>response.data)
    
}