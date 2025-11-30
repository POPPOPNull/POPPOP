import API from './JwtAPI';


const BACKEND_URL = 'http://localhost:8080';

// 상세조회 로그수집
export function logDataByPopupDetail(popupNo){
    return API.post(`${BACKEND_URL}/behavior/click?popupNo=${popupNo}`)
    .then(response => response.data)
    
}
// 노출 로그 수집
export function logDataBySelect(popupNo){
    return API.post(`${BACKEND_URL}/behavior/select/${popupNo}`)
    .then(response=>response.data)
}
// 검색 로그 수집
export function logSearchWord(searchWord){
    return API.post(`${BACKEND_URL}/behavior/searchWord?searchWord=${searchWord}`)
    .then(response=>response.data)
}

// 조회수 조회
export function countViews(popupNo){
    return API.get(`${BACKEND_URL}/behavior/click/${popupNo}`)
    .then(response=>response.data)
}

// 찜 수 조회
export function countFavorite(popupNo){
    return API.get(`${BACKEND_URL}/behavior/favorite/${popupNo}`)
    .then(response=>response.data)
}