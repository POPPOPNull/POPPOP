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