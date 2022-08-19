import axios from 'axios';
export default class ApiBase {
    //Promise周りの処理
    static createPromise<T>(caller: Function, params: {}, needToken: boolean = true): Promise<T> {
        let combinedParams = Object.assign(params)

        if(needToken) {
            combinedParams["authorization"] = localStorage.getItem('auth._token.local');
            axios.defaults.headers.Authorization = localStorage.getItem('auth._token.local');
        }

        return new Promise( async( resolve, reject ) => {
            try{
                const response = await caller( combinedParams );
                resolve( response.data );
            } catch(error) {
                reject( error );
            }
        });
    }
}