import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';

export function selectInfo() {
    return API.get(`${BACKEND_URL}/myinfo`)
    .then(response=>response.data);
}
