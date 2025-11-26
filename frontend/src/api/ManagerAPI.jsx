import API from "./JwtAPI";

const BACKEND_URL = "http://localhost:8080";

// 팝업 등록 API
export function registerPopup(formData) {
  return API.post(`${BACKEND_URL}/manager/popup-stores`, formData)
    .then((response) => {
      console.log("팝업 등록 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("팝업 등록 에러:", error);
      throw error;
    });
}

//팝업 조회
export function getMyPopupList() {
  return API.get(`${BACKEND_URL}/manager/mypopup`)
    .then((response) => {
      console.log("나의 팝업스토어 목록 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("나의 팝업스토어 목록 조회 오류:", error);
      throw error;
    });
}

//팝업 상세 조회
export function fetchMyPopupDetail(popupNo) {
  return API.get(`${BACKEND_URL}/manager/mypopup/${popupNo}`)
    .then((response) => {
      console.log("나의 팝업 상세 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("나의 팝업 상세 조회 오류:", error);
      throw error;
    });
}

//예약 
export function fetchMyPopupReservations(popupNo) {
  return API.get(`${BACKEND_URL}/manager/reservations/${popupNo}`)
    .then((response) => {
      console.log("나의 팝업 예약내역 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("나의 팝업 예약내역 조회 오류:", error);
      throw error;
    });
}

// 팝업 수정 
export function updatePopup(popupNo, formData) {
  return API.put(`${BACKEND_URL}/manager/popup-stores/${popupNo}`, formData)
    .then((response) => {
      console.log("팝업 수정 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("팝업 수정 에러:", error);
      throw error;
    });
}

// 매니저 대시보드 상단 KPI 조회
export function fetchManagerDashboardSummary(popupNo) {
  return API.get(`${BACKEND_URL}/manager/dashboard/${popupNo}`)
    .then((response) => {
      console.log("매니저 대시보드 상단 데이터 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("매니저 대시보드 상단 데이터 조회 실패:", error);
      throw error;
    });
}
