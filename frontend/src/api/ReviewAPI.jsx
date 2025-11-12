<<<<<<< HEAD
import axios from "axios";
=======
import API from './JwtAPI';
>>>>>>> JWT/master

const BACKEND_URL = 'http://localhost:8080';

// 팝업 상세 내부 리뷰 조회
export function selectReviewByPopupStore(popupNo){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/review/${popupNo}`)
=======
    return API.get(`${BACKEND_URL}/review/${popupNo}`)
>>>>>>> JWT/master
    .then(response=>response.data)
}

// 리뷰 등록
<<<<<<< HEAD
export function insertReview(review){
    return axios.post(`${BACKEND_URL}/review/insert`,review)
=======
export function insertReview(content,popupNo){
    return API.post(`${BACKEND_URL}/review/insert?content=${content}&popupNo=${popupNo}`,{content:content,popupNo:popupNo})
>>>>>>> JWT/master
    .then(response=>response.data)
}
