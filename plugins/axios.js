import axios from 'axios';

export default function({ $axios }) {
    $axios.onRequest(async(config) => {
        axios.defaults.headers.Authorization = localStorage.getItem(
            'auth._token.local'
        )
        return config
    })
}