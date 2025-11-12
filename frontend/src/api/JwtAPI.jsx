import axios from 'axios';

const JwtAPI = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 모든 요청 시 JWT 토큰을 Authorization 헤더에 추가하는 인터셉터
JwtAPI.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    console.log("localStorage keys:", Object.keys(localStorage));
    console.log("token:", localStorage.getItem('token'));
    console.log(token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default JwtAPI;