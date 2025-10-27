import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

// 전체 팝업스토어 조회
export function selectAllPopupStore(){
    return axios.get(`${BACKEND_URL}/popup-stores/lower`)
    .then(response=>response.data)
}