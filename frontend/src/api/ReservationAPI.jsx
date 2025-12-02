import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';

export function getMyReservations() {
    return API.get(`${BACKEND_URL}/myreservation`)
    .then(response=>response.data);
}



export function cancelReservation(reservationNo) {

  return API.put(`/myreservation/${reservationNo}/cancel`)

    .then(response=>response.data);

}



export function cancelPaidReservation(reservationNo) {

  return API.post(`${BACKEND_URL}/reservations/${reservationNo}/cancel`)

    .then(response => response.data);

}
