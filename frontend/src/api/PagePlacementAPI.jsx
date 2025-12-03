import API from './JwtAPI';

export function getTopPlacement(){

    return API.get(`/page-placement/top`)

    .then(response=>response.data)
}