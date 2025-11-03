import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

export function insertFavorite(popupNo,favorite){
    return axios.post(`${BACKEND_URL}/favorite?popupNo=${popupNo}`,favorite)
    .then(response=>response.data)
}