import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';

export function selectInfo() {
    return API.get(`${BACKEND_URL}/myinfo`)
    .then(response=>response.data);
}

export function updateEmail(email) {
    return API.put(`${BACKEND_URL}/myinfo/email`, {email})
    .then(response=>response.data);
}

export function updatePhone(phone) {
    return API.put(`${BACKEND_URL}/myinfo/phone`, {phone})
    .then(response=>response.data);
}