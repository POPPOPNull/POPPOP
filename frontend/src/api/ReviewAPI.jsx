import API from './JwtAPI';


// 팝업 상세 내부 리뷰 조회
export function selectReviewByPopupStore(popupNo){
    return API.get(`/review/${popupNo}`)
    .then(response=>response.data)
}

// 리뷰 등록
export function insertReview(content,popupNo){
    return API.post(`/review/insert?content=${content}&popupNo=${popupNo}`,{content:content,popupNo:popupNo})
    .then(response=>response.data)
}

// 내 리뷰 조회
export function selectReviewById(){
    return API.get(`/myreview`)
    .then(response=>response.data)
}

// 내 리뷰 삭제
export function deleteReviewById(reviewNo) {
  return API.delete(`/myreview`, {
    params: { reviewNo }
  }).then((response) => response.data);
}

// 내 리뷰 수정
export function updateReviewById(reviewNo, {content}) {
  return API.put(`/myreview/${reviewNo}`, {content})
  .then((response) => response.data);
}