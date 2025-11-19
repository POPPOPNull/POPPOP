
import API from './JwtAPI';


const BACKEND_URL = 'http://localhost:8080';

// 전체 회원(user) 조회
export function selectAllMembers() {
    return API.get(`${BACKEND_URL}/admin/members`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectAllMembers", error);
        throw error;
    });
}

// 전체 리뷰 조회
export function selectAllReviews() {
    return API.get(`${BACKEND_URL}/admin/reviews`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectAllReviews", error);
        throw error;
    });
}

// 전체 예약 내역(user) 조회
export function selectAllReservation() {
    return API.get(`${BACKEND_URL}/admin/reservation`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectAllReservation", error);
        throw error;
    });
}

// 전체 회원(manager) 조회
export function selectAllManager() {

    return API.get(`${BACKEND_URL}/admin/manager-members`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectAllManager", error);
        throw error;
    });
}

// 전체 팝업 스토어 조회
export function selectAllPopup() {
    return API.get(`${BACKEND_URL}/admin/manager-popup`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectAllPopup", error);
        throw error;
    });
}

// 팝업 스토어 상세 조회
export function selectPopupDetails(popupNo) {
    return API.get(`${BACKEND_URL}/admin/manager-popup/${popupNo}`)
    .then(response=>response.data)
    .catch(error=> {
        console.error(`API call error in selectPopupDetails ${popupNo}`, error);
        throw error;
    });
}

// 팝업 스토어 승인 처리
export function approvePopup(popupNo) {
    return API.put(`${BACKEND_URL}/admin/manager-popup/${popupNo}/approve`)
    .then(response=>response.data)
    .catch(error=> {
        console.error(`API call error in approvePopup ${popupNo}`, error);
        throw error;
    });
}

// 팝업 스토어 반려 처리
export function rejectPopup(popupNo, rejectionReason) {
    return API.put(`${BACKEND_URL}/admin/manager-popup/${popupNo}/reject`, { rejectionReason })
    .then(response=>response.data)
    .catch(error=> {
        console.error(`API call error in rejectPopup ${popupNo}`, error);
        throw error;
    });
}

// 팝업 스토어 별 예약 조회(집계)
export function selectReservationSummary() {
    return API.get(`${BACKEND_URL}/admin/manager-reservation`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectReservationSummary", error);
        throw error;
    });
}

// 팝업 스토어 별 상세 예약 조회
export function selectReservationDetailsByPopup(popupNo) {
    return API.get(`${BACKEND_URL}/admin/manager-reservation/${popupNo}`)
    .then(response=>response.data)
    .catch(error=> {
        console.error(`API call error in selectReservationDetailsByPopup ${popupNo}`, error);
        throw error;
    });
}

// 예약 취소
export function deleteReservation(reservationNo) {
    return API.delete(`${BACKEND_URL}/admin/reservation/${reservationNo}`)
    .then(response=>response.data)
    .catch(error=> {
        console.error(`API call error in deleteReservation By reservationNo ${reservationNo}`, error);
        throw error;
    });
}

// user 대시보드 KPI 카드 데이터 조회
export function selectUserKpiData() {
    return API.get(`${BACKEND_URL}/admin/kpi/user`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectUserKpiData", error);
        throw error;
    });
}

// user 대시보드 꺾은 선 차트 월별 회원가입률 조회
export function selectMonthlyVisitorStats() {
    return API.get(`${BACKEND_URL}/admin/kpi/monthly-visitor-stats`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectMonthlyVisitorStats");
        throw error;
    });
}

// user 대시보드 꺾은 선 차트 월별 활동회원 비율 조회
export function selectMonthlyMemberActivityStats() {
    return API.get(`${BACKEND_URL}/admin/kpi/monthly-member-activity`)
    .then(response=>response.data)
    .catch(error=> {
        console.error("API call error in selectMonthlyMemberActivityStats", error);
        throw error;
    });
}