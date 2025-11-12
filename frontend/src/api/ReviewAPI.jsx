import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';

// 팝업 상세 내부 리뷰 조회
export function selectReviewByPopupStore(popupNo){
    return API.get(`${BACKEND_URL}/review/${popupNo}`)
    .then(response=>response.data)
}

// 리뷰 등록
export function insertReview(review){
    return API.post(`${BACKEND_URL}/review/insert`,review)
    .then(response=>response.data)
}
