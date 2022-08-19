import axios from "axios";

let domain = process.env.API_URL+'/api'
let axiosInstance = axios.create()

//header設定
axiosInstance.defaults.headers.Authorization = localStorage.getItem('auth._token.local');

const memberTemporaryRegistration = (data) =>
    axios.post(domain + '/member/temporary_registration', {
        email: data.email,
    })
const memberEmailVerification = (data) =>
    axios.post(domain + '/member/email_verification', {
        token: data.token,
    })

const memberDefinitiveRegistration = (data) =>
    axios.post(domain + '/member/definitive_registration', {
        token: data.token,
        email: data.email,
        password: data.password,
        name: data.name,
    })    

export {
    memberTemporaryRegistration,
    memberEmailVerification,
    memberDefinitiveRegistration,
}