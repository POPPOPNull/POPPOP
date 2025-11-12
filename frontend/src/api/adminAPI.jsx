<<<<<<< HEAD
import axios from "axios";
=======
import API from './JwtAPI';
>>>>>>> JWT/master

const BACKEND_URL = 'http://localhost:8080';

// 전체 회원(user) 조회
export async function selectAllMembers() {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/members`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/members`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllMembers", error);
        throw error;
    }
}

// 전체 리뷰 조회
export async function selectAllReviews() {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/reviews`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/reviews`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllReviews", error);
        throw error;
    }
}

// 전체 예약 내역(user) 조회
export async function selectAllReservation() {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/reservation`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/reservation`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllReservation", error);
        throw error;
    }
}

// 전체 회원(manager) 조회
export async function selectAllManager() {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/manager-members`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/manager-members`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllManager", error);
        throw error;
    }
}

// 전체 팝업 스토어 조회
export async function selectAllPopup() {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/manager-popup`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/manager-popup`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllPopup", error);
        throw error;
    }
}

// 팝업 스토어 상세 조회
export async function selectPopupDetails(popupNo) {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/manager-popup/${popupNo}`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/manager-popup/${popupNo}`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error(`API call error in selectPopupDetails ${popupNo}`, error);
        throw error;
    }
}

// 팝업 스토어 승인 처리
export async function approvePopup(popupNo) {
    try {
<<<<<<< HEAD
        const response = await axios.put(`${BACKEND_URL}/admin/manager-popup/${popupNo}/approve`);
=======
        const response = await API.put(`${BACKEND_URL}/admin/manager-popup/${popupNo}/approve`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error(`API call error in approvePopup ${popupNo}`, error);
        throw error;
    }
}

// 팝업 스토어 반려 처리
export async function rejectPopup(popupNo, rejectionReason) {
    try {
<<<<<<< HEAD
        const response = await axios.put(`${BACKEND_URL}/admin/manager-popup/${popupNo}/reject`, { rejectionReason });
=======
        const response = await API.put(`${BACKEND_URL}/admin/manager-popup/${popupNo}/reject`, { rejectionReason });
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error(`API call error in rejectPopup ${popupNo}`, error);
        throw error;
    }
}

// 팝업 스토어 별 예약 조회(집계)
export async function selectReservationSummary() {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/manager-reservation`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/manager-reservation`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error("API call error in selectReservationSummary", error);
        throw error;
    }
}

// 팝업 스토어 별 상세 예약 조회
export async function selectReservationDetailsByPopup(popupNo) {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BACKEND_URL}/admin/manager-reservation/${popupNo}`);
=======
        const response = await API.get(`${BACKEND_URL}/admin/manager-reservation/${popupNo}`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error(`API call error in getReservationDetailsByPopup ${popupNo}`, error);
        throw error;
    }
}

// 예약 취소
export async function deleteReservation(reservationNo) {
    try {
<<<<<<< HEAD
        const response = await axios.delete(`${BACKEND_URL}/admin/reservation/${reservationNo}`);
=======
        const response = await API.delete(`${BACKEND_URL}/admin/reservation/${reservationNo}`);
>>>>>>> JWT/master
        return response.data;
    } catch (error) {
        console.error(`API call error in deleteReservation By reservationId ${reservationNo}`, error);
        throw error;
    }
<<<<<<< HEAD
}

// user 대시보드 KPI 카드 데이터 조회
export async function selectUserKpiData() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/kpi/user`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectUserKpiData", error);
        throw error;
    }
=======
>>>>>>> JWT/master
}