import API from './JwtAPI'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 챗봇에 메시지 전송
 */
export const sendMessage = async (message) => {
  try {
    const response = await API.post('/api/chatbot/message', { message });
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
    const response = await API.get('/api/chatbot/suggestions'); 
    return response.data;
    
    } catch (error) {
    console.error('추천 목록 가져오기 실패:', error);
    throw error;
  }
};
