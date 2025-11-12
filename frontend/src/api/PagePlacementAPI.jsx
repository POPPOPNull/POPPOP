<<<<<<< HEAD
import axios from "axios";
=======
import API from './JwtAPI';
>>>>>>> JWT/master

const BACKEND_URL = 'http://localhost:8080';

export function getTopPlacement(){
<<<<<<< HEAD
    return axios.get(`${BACKEND_URL}/page-placement/top`)
=======
    return API.get(`${BACKEND_URL}/page-placement/top`)
>>>>>>> JWT/master
    .then(response=>response.data)
}