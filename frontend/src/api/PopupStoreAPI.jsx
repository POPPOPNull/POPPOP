import axios from "axios";
import { useState } from "react";
import API from './JwtAPI';
import { logDataBySelect } from "./BehaviorAPI";

const restapikey = import.meta.env.VITE_KAKAOMAP_RESTAPI_KEY


// 전체 팝업스토어 조회
export function selectAllPopupStore(){

    return API.get(`/popup-stores/lower`)

    .then(response=>response.data)
}

// 팝업스토어 상세조회
export function selectPopupStoreDetails(popupNo){

    return API.get(`/popup-stores/${popupNo}`)
    .then(response=>response.data)
}

// 주소 -> 좌표 변환 // axios 보류
export function locationCoordExchange(location){
    return API.get(`/kakao/address`, {
        params: { query: location }
    }).then((response) => response.data);
}

// 팝업스토어 오늘 기준 오픈예정상태 및 검색어에 따른 조회
export function selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord){

    return API.get(`/popup-stores?startDate=${startDate}&endDate=${endDate}&status=${status}&searchWord=${searchWord}`)
    .then(response=>response.data)
}
// 팝업스토어 검색조회
export function selectPopupStoreBySearchWord(searchWord){

    return API.get(`/popup-stores/search`,searchWord)
    .then(response=>response.data)
}
// 팝업스토어 검색조회 -> 미사용
// export function selectPopupStoreBySearchWord(searchWord){
//     return axios.get(`${BACKEND_URL}/popup-stores/search`,searchWord)
//     .then(response=>response.data)
// }

//팝업스토어 찜목록 조회
export function selectFavoritePopupStoreById(){
    return API.get(`/popup-stores/favorite`)
    .then(response=>response.data)
}

// 팝업스토어 랜덤조회
export function selectPopupRandomly(size,length){


    const arr = new Set();
    for(let i =0;i<size;i=arr.size){
        const a = parseInt((Math.random()*length)+1)
        arr.add(a)
    }
    const arr2 = Array.from(arr)
    console.log(arr2)

    return API.get(`/popup-stores/random/${arr2}`)
    .then(response=>response.data)
}

//팝업스토어 카테고리 집계
export function selectAllCategory(){

    return API.get(`/popup-stores/category`)
    .then(response => response.data)
}

//팝업스토어 카테고리별 조회
export function selectPopupStoreByCategory(category){
    return API.get(`/popup-stores/category/${category}`)
    .then(response=>response.data)
}

// 날짜별 팝업스토어 조회
export function selectPopupByDate(date){
    return API.get(`/popup-stores/date/${date}`)
    .then(response=>response.data)
}