import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

//전체조회
export function getAllUsers(){
    return axios.get(`${BACKEND_URL}/user/list`)
    .then(response => response.data)
    .catch(error => {
        console.error("유저 전체 조회 API : ", error);
        return[]
    })
}

//등록
export function registUser(user){
    return axios.post(`${BACKEND_URL}/user/user`,user)
    .then(function(response){
        console.log(response.data)
    })
    
}

//수정
export function updateUser(id,userDTO){
    return axios.put(`${BACKEND_URL}/user/user/${id}`,userDTO)
    .then(function(response){
        console.log(response.data)
    })
    
}

//삭제
export function removeUser(id){
    return axios.delete(`${BACKEND_URL}/user/user/${id}`,{data : id})
    .then(function(response){
        console.log(response.data)
    })
}