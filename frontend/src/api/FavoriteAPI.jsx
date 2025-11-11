import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

//찜추가
export function insertFavorite(popupNo,id){
    return axios.post(`${BACKEND_URL}/favorite?popupNo=${popupNo}&memberId=${id}`,{popupNo : popupNo, memberId : id})
    .then(response=>response.data)
}

//찜 제거
export function deleteFavorite(popupNo,id){
    return axios.delete(`${BACKEND_URL}/favorite?popupNo=${popupNo}&id=${id}`)
    .then(response=>response.data)
}