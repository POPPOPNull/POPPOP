<<<<<<< HEAD
import axios from "axios";
=======
import API from './JwtAPI';;
>>>>>>> JWT/master

const BACKEND_URL = 'http://localhost:8080';

//전체조회
export function getAllUsers(){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/user/list`)
=======
    return API.get(`${BACKEND_URL}/user/list`)
>>>>>>> JWT/master
    .then(response => response.data)
    .catch(error => {
        console.error("유저 전체 조회 API : ", error);
        return[]
    })
}

//등록
export function registUser(user){
<<<<<<< HEAD
    return axios.post(`${BACKEND_URL}/user/user`,user)
=======
    return API.post(`${BACKEND_URL}/user/user`,user)
>>>>>>> JWT/master
    .then(function(response){
        console.log(response.data)
    })
    
}

//수정
export function updateUser(id,userDTO){
<<<<<<< HEAD
    return axios.put(`${BACKEND_URL}/user/user/${id}`,userDTO)
=======
    return API.put(`${BACKEND_URL}/user/user/${id}`,userDTO)
>>>>>>> JWT/master
    .then(function(response){
        console.log(response.data)
    })
    
}

//삭제
export function removeUser(id){
<<<<<<< HEAD
    return axios.delete(`${BACKEND_URL}/user/user/${id}`)
=======
    return API.delete(`${BACKEND_URL}/user/user/${id}`)
>>>>>>> JWT/master
    .then(function(response){
        console.log(response.data)
    })
}