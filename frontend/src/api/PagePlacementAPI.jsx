import axios from "axios";

const BACKEND_URL = 'http://localhost:8080';

export function getTopPlacement(){
    return axios.get(`${BACKEND_URL}/page-placement/top`)
    .then(response=>response.data)
}