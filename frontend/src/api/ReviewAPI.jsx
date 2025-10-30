import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

// 팝업 상세 내부 리뷰 조회
export function selectReviewByPopupStore(popupNo){
    return axios.get(`${BACKEND_URL}/review/${popupNo}`)
    .then(response=>response.data)
}
