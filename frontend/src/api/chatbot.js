import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * 챗봇에 메시지 전송
 */
export const sendMessage = async (message) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/chatbot/message`,
      { message },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('챗봇 메시지 전송 실패:', error);
    throw error;
  }
};

/**
 * 추천 팝업스토어 목록 가져오기
 */
export const getSuggestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chatbot/suggestions`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('추천 목록 가져오기 실패:', error);
    throw error;
  }
};
