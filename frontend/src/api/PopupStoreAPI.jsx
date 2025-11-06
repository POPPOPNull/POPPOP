import axios from "axios";
import { useState } from "react";


const restapikey = import.meta.env.VITE_KAKAOMAP_RESTAPI_KEY

const BACKEND_URL = 'http://localhost:8080';

// 전체 팝업스토어 조회
export function selectAllPopupStore(){
    return axios.get(`${BACKEND_URL}/popup-stores/lower`)
    .then(response=>response.data)
}

// 팝업스토어 상세조회
export function selectPopupStoreDetails(popupNo){
    return axios.get(`${BACKEND_URL}/popup-stores/${popupNo}`)
    .then(response=>response.data)
}

// 주소 -> 좌표 변환
export function locationCoordExchange(location){
    return axios.get(`https://dapi.kakao.com/v2/local/search/address?query=${location}`,{headers:{Authorization: 'KakaoAK'+' '+restapikey}})
    .then(response=>response.data)
    
}

// 팝업스토어 오늘 기준 오픈예정상태 및 검색어에 따른 조회
export function selectPopupstoreByOpenStatus(startDate,endDate,status,searchWord){
    return axios.get(`${BACKEND_URL}/popup-stores?startDate=${startDate}&endDate=${endDate}&status=${status}&searchWord=${searchWord}`)
    .then(response=>response.data)
}
// 팝업스토어 검색조회
export function selectPopupStoreBySearchWord(searchWord){
    return axios.get(`${BACKEND_URL}/popup-stores/search`,searchWord)
    .then(response=>response.data)
}
//팝업스토어 찜목록 조회
export function selectFavoritePopupStoreById(id){
    return axios.get(`${BACKEND_URL}/popup-stores/favorite/${id}`)
    .then(response=>response.data)
}

// 팝업스토어 랜덤조회
export function selectPopupRandomly(size){


    const arr = new Array();
    for(let i =arr.length;i<7;i++){
        arr[i]=parseInt((Math.random()*size)+1)
    }
    console.log("arr",arr)


    return axios.get(`${BACKEND_URL}/popup-stores/random/${arr}`)
    .then(response=>response.data)
}

//팝업스토어 카테고리 집계
export function selectAllCategory(){
    return axios.get(`${BACKEND_URL}/popup-stores/category`)
    .then(response => response.data)
}

//팝업스토어 카테고리별 조회
export function selectPopupStoreByCategory(category){
    return axios.get(`${BACKEND_URL}/popup-stores/category/${category}`)
    .then(response=>response.data)
}