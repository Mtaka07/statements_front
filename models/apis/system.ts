import * as STATEMENT from '~/vendor/apis/statements_api';

import ApiBase from './base';
import EmailVerification from '~/models/entities/emailVerification';
import Member from '~/models/entities/member';

export default class SystemApi extends ApiBase {
/**
 * @description 会員仮登録
 * @param email
 */
public static temporaryRegistration(email: string): Promise<EmailVerification> {
    return this.createPromise( STATEMENT.memberTemporaryRegistration, {
        email:email
    })
}
/**
 * @description メール認証
 * @param token 
 * @returns 
 */
public static emailVerification(token: string): Promise<any> {
    return this.createPromise( STATEMENT.memberEmailVerification, {
        token:token
    })
}
/**
 * @description 本登録
 * @param email 
 * @param password 
 * @param token 
 * @param name 
 * @returns 
 */
public static definitiveRegistration(email: string, password: string, token: string, name: string): Promise<any> {
    return this.createPromise(STATEMENT.memberDefinitiveRegistration, {
        email:email,
        password:password,
        token:token,
        name:name,
    })
}
/**
 * @description ログイン処理
 * @param mail 
 * @param password 
 * @param remember 
 * @returns 
 */
public static login(mail: string, password: string, remember: boolean = true):Promise<Member> {
    return this.createPromise(STATEMENT.memberLogin, {
        mail:mail,
        password:password,
        remember:remember
    }, false);
}
/**
 * メンバー情報取得
 */
public static getMember():Promise<Member> {
    return this.createPromise(STATEMENT.getMember, {});
}

}
