
import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';





//찜 제거
export function deleteFavorite(popupNo,id){
    return API.delete(`${BACKEND_URL}/favorite?popupNo=${popupNo}&id=${id}`)
    .then(response=>response.data)
}
//찜추가
export function insertFavorite(popupNo){
// const token = localStorage.getItem('token');

//     if (!token) {
//         console.warn('FavoriteAPI: Token is missing at the time of call.');
//         return Promise.reject(new Error('No access token. Please log in.'));
//     }

//     console.log('FavoriteAPI: Token found and proceeding with API call.');

//     return API.post(
//         `/favorite?popupNo=${popupNo}`,
//         {popupNo : popupNo}
//     )
//     .then(response => response.data)
//     .catch(err => {
//         console.error('insertFavorite error:', err);
//         throw err; 
//     });
    return API.post(`${BACKEND_URL}/favorite?popupNo=${popupNo}`,{popupNo:popupNo})
    .then(response=>response.data)

}

//찜한 팝업스토어 번호  조회
export function selectFavoritePopupNo(){
    return API.get(`${BACKEND_URL}/favorite/no`)
    .then(response=>response.data)
}