import axios from "axios";

let domain = process.env.API_URL+'/api'
let axiosInstance = axios.create()

//header設定
axiosInstance.defaults.headers.Authorization = localStorage.getItem('auth._token.local');

/** 仮登録 */
const memberTemporaryRegistration = (data) =>
    axios.post(domain + '/member/temporary_registration', {
        email: data.email,
    })

/** メール確認 */
const memberEmailVerification = (data) =>
    axios.post(domain + '/member/email_verification', {
        token: data.token,
    })

/** 本登録 */
const memberDefinitiveRegistration = (data) =>
    axios.post(domain + '/member/definitive_registration', {
        email: data.email,
        password: data.password,
        token: data.token,
        name: data.name,
    })  

/** ログイン */
const memberLogin = (data) =>
    axios.post(domain + '/login', {
        mail: data.mail,
        password: data.password,
        remember: data.remember
    })

/** メンバー情報取得 */ 
const getMember = (data) =>
    axios.get(domain + 'member', {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    })

export {
    memberTemporaryRegistration,
    memberEmailVerification,
    memberDefinitiveRegistration,
    memberLogin,
    getMember,
}