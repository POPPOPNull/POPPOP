import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

//찜추가
export function insertFavorite(popupNo,id){
    return axios.post(`${BACKEND_URL}/favorite?popupNo=${popupNo}&memberId=${id}`,{popupNo : popupNo, memberId : id})
    .then(response=>response.data)
}