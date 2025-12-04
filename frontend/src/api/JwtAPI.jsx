import axios from 'axios';

const JwtAPI = axios.create({
  baseURL: "localhost:8080",
  withCredentials: true, // refresh 토큰을 쿠키로 쓰는 경우
});

// 요청 인터셉터: accessToken 있으면 Authorization 헤더 달기
JwtAPI.interceptors.request.use((config) => {
  if(config.url?.includes('/auth/refresh')){
    return config;
  }
  
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
JwtAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes('/auth/login') ||
        originalRequest?.url?.includes('/auth/admin/login')) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {

      if (!localStorage.getItem('accessToken')) {
        // 비로그인 상태 → refresh 시도 x
        return Promise.reject(error);
      }

      try {
        originalRequest._retry = true;

        const refreshResponse = await JwtAPI.get('/auth/refresh', {
          withCredentials: true,
        });

        const newAccessToken = refreshResponse.data.accessToken;

        // 새 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);

        // 원래 요청 헤더에 새 토큰 세팅
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return JwtAPI(originalRequest);
      } catch (refreshError) {
        console.log('Refresh Token 갱신 실패. 강제 로그아웃 처리.');
        console.log('refresh 실패 응답:', refreshError.response?.data);

        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default JwtAPI;
