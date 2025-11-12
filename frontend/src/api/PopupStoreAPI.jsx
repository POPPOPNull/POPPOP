<<<<<<< HEAD
import axios from "axios";
import { useState } from "react";
=======
import { useState } from "react";
import API from './JwtAPI';
>>>>>>> JWT/master


const restapikey = import.meta.env.VITE_KAKAOMAP_RESTAPI_KEY

const BACKEND_URL = 'http://localhost:8080';

// 전체 팝업스토어 조회
export function selectAllPopupStore(){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores/lower`)
=======
    return API.get(`${BACKEND_URL}/popup-stores/lower`)
>>>>>>> JWT/master
    .then(response=>response.data)
}

// 팝업스토어 상세조회
export function selectPopupStoreDetails(popupNo){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores/${popupNo}`)
    .then(response=>response.data)
}

// 주소 -> 좌표 변환
export function locationCoordExchange(location){
    return axios.get(`https://dapi.kakao.com/v2/local/search/address?query=${location}`,{headers:{Authorization: 'KakaoAK'+' '+restapikey}})
=======
    return API.get(`${BACKEND_URL}/popup-stores/${popupNo}`)
    .then(response=>response.data)
}

// 주소 -> 좌표 변환 // axios 보류
export function locationCoordExchange(location){
    return API.get(`https://dapi.kakao.com/v2/local/search/address?query=${location}`,{headers:{Authorization: 'KakaoAK'+' '+restapikey}})
>>>>>>> JWT/master
    .then(response=>response.data)
    
}

// 팝업스토어 오늘 기준 오픈예정상태 및 검색어에 따른 조회
export function selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores?startDate=${startDate}&endDate=${endDate}&status=${status}&searchWord=${searchWord}`)
=======
    return API.get(`${BACKEND_URL}/popup-stores?startDate=${startDate}&endDate=${endDate}&status=${status}&searchWord=${searchWord}`)
>>>>>>> JWT/master
    .then(response=>response.data)
}
// 팝업스토어 검색조회
export function selectPopupStoreBySearchWord(searchWord){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores/search`,searchWord)
    .then(response=>response.data)
}
//팝업스토어 찜목록 조회
export function selectFavoritePopupStoreById(id){
    return axios.get(`${BACKEND_URL}/popup-stores/favorite/${id}`)
=======
    return API.get(`${BACKEND_URL}/popup-stores/search`,searchWord)
    .then(response=>response.data)
}
// 팝업스토어 검색조회 -> 미사용
// export function selectPopupStoreBySearchWord(searchWord){
//     return axios.get(`${BACKEND_URL}/popup-stores/search`,searchWord)
//     .then(response=>response.data)
// }

//팝업스토어 찜목록 조회
export function selectFavoritePopupStoreById(){
    return API.get(`${BACKEND_URL}/popup-stores/favorite`)
>>>>>>> JWT/master
    .then(response=>response.data)
}

// 팝업스토어 랜덤조회
export function selectPopupRandomly(size,length){


    const arr = new Set();
    for(let i =0;i<size;i=arr.size){
        const a = parseInt((Math.random()*length)+1)
        arr.add(a)
    }
    console.log(arr)
    const arr2 = Array.from(arr)
    console.log(arr2)



<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores/random/${arr2}`)
=======
    return API.get(`${BACKEND_URL}/popup-stores/random/${arr2}`)
>>>>>>> JWT/master
    .then(response=>response.data)
}

//팝업스토어 카테고리 집계
export function selectAllCategory(){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores/category`)
=======
    return API.get(`${BACKEND_URL}/popup-stores/category`)
>>>>>>> JWT/master
    .then(response => response.data)
}

//팝업스토어 카테고리별 조회
export function selectPopupStoreByCategory(category){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/popup-stores/category/${category}`)
=======
    return API.get(`${BACKEND_URL}/popup-stores/category/${category}`)
>>>>>>> JWT/master
    .then(response=>response.data)
}