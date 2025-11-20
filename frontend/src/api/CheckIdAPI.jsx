import API from './JwtAPI';

export default function checkIdAvailable(id) {
    return API.get('/auth/idcheck',{
        params: {id: id },
    }).then(response=>response.data);
}