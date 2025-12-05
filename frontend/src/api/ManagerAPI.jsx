import API from "./JwtAPI";

// 팝업 등록 API
export function registerPopup(formData) {
  return API.post(`/manager/popup-stores`, formData)
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
  return API.get(`/manager/mypopup`)
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
  return API.get(`/manager/mypopup/${popupNo}`)
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
  return API.get(`/manager/reservations/${popupNo}`)
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
  return API.put(`/manager/popup-stores/${popupNo}`, formData)
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
  return API.get(`/manager/dashboard/${popupNo}`)
    .then((response) => {
      console.log("매니저 대시보드 상단 데이터 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("매니저 대시보드 상단 데이터 조회 실패:", error);
      throw error;
    });
}

// 예약 추이 API (최근 7일)
export function fetchReservationTrend(popupNo) {
  return API.get(`/manager/dashboard/${popupNo}/reservation-trend`)
    .then((response) => {
      console.log("예약 추이 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("예약 추이 조회 오류:", error);
      throw error;
    });
}

// 2행 요일별 예약 패턴
export function fetchWeekdayReservations(popupNo) {
  return API.get(`/manager/dashboard/${popupNo}/weekday-reservations`)
    .then((response) => {
      console.log("요일별 예약 패턴 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("요일별 예약 패턴 조회 오류:", error);
      throw error;
    });
}

// 2행 예약자 성별 비율
export function fetchGenderRatio(popupNo) {
  return API.get(`/manager/dashboard/${popupNo}/gender-ratio`)
    .then((response) => {
      console.log("예약자 성별 비율 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("예약자 성별 비율 조회 오류:", error);
      throw error;
    });
}

// 1행 이벤트 비율 
export function fetchEventTypeStats(popupNo) {
  return API.get(`/manager/dashboard/${popupNo}/event-type-stats`)
    .then((response) => {
      console.log("이벤트 유형 비율 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("이벤트 유형 비율 조회 오류:", error);
      throw error;
    });
}

// ==============================
// 매니저 전체 대시보드 API

// 1행 — 최근 7일 예약 추이
export function fetchManagerOverviewReservationTrend() {
  return API.get(`/manager/dashboard/overview/reservation-trend`)
    .then((response) => {
      console.log("전체 대시보드 | 예약 추이 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("전체 대시보드 | 예약 추이 조회 오류:", error);
      throw error;
    });
}

// 1행 — 사용자 행동 유형 비율
export function fetchManagerOverviewEventTypeStats() {
  return API.get(`/manager/dashboard/overview/event-type-stats`)
    .then((response) => {
      console.log("전체 대시보드 | 이벤트 유형 비율 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("전체 대시보드 | 이벤트 유형 비율 조회 오류:", error);
      throw error;
    });
}

// 2행 — 요일별 예약 패턴
export function fetchManagerOverviewWeekdayReservations() {
  return API.get(`/manager/dashboard/overview/weekday-reservations`)
    .then((response) => {
      console.log("전체 대시보드 | 요일별 예약 패턴 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("전체 대시보드 | 요일별 예약 패턴 조회 오류:", error);
      throw error;
    });
}

// 2행 — 예약자 성별 비율
export function fetchManagerOverviewGenderRatio() {
  return API.get(`/manager/dashboard/overview/gender-ratio`)
    .then((response) => {
      console.log("전체 대시보드 | 성별 예약자 비율 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("전체 대시보드 | 성별 예약자 비율 조회 오류:", error);
      throw error;
    });
}
// ==============================

// 팝업별 최근 예약자 5명 조회
export function fetchPopupRecentReservations(popupNo, limit = 5) {
  return API.get(
    `/manager/mypopup/${popupNo}/reservations/recent`,
    {
      params: { limit },
    }
  )
    .then((response) => {
      console.log("팝업 최근 예약자 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("팝업 최근 예약자 조회 오류:", error);
      throw error;
    });
}

export function fetchPopupVisitors() {
  return API.get("/manager/visitors")
    .then((res) => {
      console.log("방문 로그 조회 성공:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("방문 로그 조회 실패:", err);
      throw err;
    });
}
// 매니저가 등록한 모든 팝업 대시보드 상단 요약 조회
export function fetchManagerOverviewSummary() {
  return API.get("/manager/dashboard/overview/summary")
    .then((response) => {
      console.log("전체 대시보드 상단 KPI 조회 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("전체 대시보드 상단 KPI 조회 오류:", error);
      throw error;
    });
}


