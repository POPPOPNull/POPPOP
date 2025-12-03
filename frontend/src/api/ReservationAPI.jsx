import API from './JwtAPI';


export function getMyReservations() {
    return API.get(`/myreservation`)
    .then(response=>response.data);
}



export function cancelReservation(reservationNo) {

  return API.put(`/myreservation/${reservationNo}/cancel`)

    .then(response=>response.data);

}



export function cancelPaidReservation(reservationNo) {

  return API.post(`/reservations/${reservationNo}/cancel`)

    .then(response => response.data);

}
