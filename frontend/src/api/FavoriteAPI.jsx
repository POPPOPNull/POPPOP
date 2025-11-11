import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';

//찜추가
export function insertFavorite(popupNo){
    return API.post(
        `${BACKEND_URL}/favorite?popupNo=${popupNo}`,
        {popupNo : popupNo})
    .then(response=>response.data)
}