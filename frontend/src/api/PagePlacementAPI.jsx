import API from './JwtAPI';

const BACKEND_URL = 'http://localhost:8080';

export function getTopPlacement(){
    return API.get(`${BACKEND_URL}/page-placement/top`)
    .then(response=>response.data)
}