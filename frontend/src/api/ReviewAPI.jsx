import API from './JwtAPI';


const BACKEND_URL = 'http://localhost:8080';

// 팝업 상세 내부 리뷰 조회
export function selectReviewByPopupStore(popupNo){
    return API.get(`${BACKEND_URL}/review/${popupNo}`)
    .then(response=>response.data)
}

// 리뷰 등록
export function insertReview(content,popupNo){
    return API.post(`${BACKEND_URL}/review/insert?content=${content}&popupNo=${popupNo}`,{content:content,popupNo:popupNo})
    .then(response=>response.data)
}

// 내 리뷰 조회
export function selectReviewById(){
    return API.get(`${BACKEND_URL}/myreview`)
    .then(response=>response.data)
}

//내 리뷰 삭제
export function deleteReviewById(reviewNo) {
  return API.delete(`${BACKEND_URL}/myreview`, {
    params: { reviewNo }
  }).then((response) => response.data);
}