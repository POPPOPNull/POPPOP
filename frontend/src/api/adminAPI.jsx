import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

// 전체 회원(user) 조회
export async function selectAllMembers() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/members`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllMembers", error);
        throw error;
    }
}

// 전체 리뷰 조회
export async function selectAllReviews() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/reviews`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllReviews", error);
        throw error;
    }
}

// 전체 예약 내역(user) 조회
export async function selectAllReservation() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/reservation`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllReservation", error);
        throw error;
    }
}

// 전체 회원(manager) 조회
export async function selectAllManager() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/manager-members`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllManager", error);
        throw error;
    }
}

// 전체 팝업 스토어 조회
export async function selectAllPopup() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/manager-popup`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectAllPopup", error);
        throw error;
    }
}

// 팝업 스토어 별 예약 조회
export async function selectReservationSummary() {
    try {
        const response = await axios.get(`${BACKEND_URL}/admin/manager-reservation`);
        return response.data;
    } catch (error) {
        console.error("API call error in selectReservationSummary", error);
        throw error;
    }
}