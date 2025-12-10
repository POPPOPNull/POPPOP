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

export async function confirmPayment(paymentInfo) {
  try {
    const response = await API.post('/reservations/confirm', paymentInfo);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('서버와 통신 중 오류가 발생했습니다.');
  }
}
