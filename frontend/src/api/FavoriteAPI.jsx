
import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';





//찜 제거
export function deleteFavorite(popupNo,id){
    return API.delete(`${BACKEND_URL}/favorite?popupNo=${popupNo}&id=${id}`)
    .then(response=>response.data)
}
//찜추가
export function insertFavorite(popupNo){
const token = localStorage.getItem('token');

    if (!token) {
        console.warn('FavoriteAPI: Token is missing at the time of call.');
        return Promise.reject(new Error('No access token. Please log in.'));
    }

    // ⭐ 추가 디버깅: 여기에서 토큰 값이 정상적으로 찍히는지 확인
    console.log('FavoriteAPI: Token found and proceeding with API call.');

    return API.post(
        `/favorite?popupNo=${popupNo}`,
        {popupNo : popupNo}
    )
    .then(response => response.data)
    .catch(err => {
        console.error('insertFavorite error:', err);
        throw err; 
    });

}