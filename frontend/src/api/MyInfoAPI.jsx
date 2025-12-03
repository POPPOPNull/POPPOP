import API from './JwtAPI';


export function selectInfo() {
    return API.get(`/myinfo`)
    .then(response=>response.data);
}

export function updateEmail(email) {
    return API.put(`/myinfo/email`, {email})
    .then(response=>response.data);
}

export function updatePhone(phone) {
    return API.put(`/myinfo/phone`, {phone})
    .then(response=>response.data);
}