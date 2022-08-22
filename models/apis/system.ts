import * as STATEMENT from '~/vendor/apis/statements_api';

import ApiBase from './base';
import EmailVerification from '~/models/entities/emailVerification';

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

public static emailVerification(token: string): Promise<any> {
    return this.createPromise( STATEMENT.memberEmailVerification, {
        token:token
    })
}

public static definitiveRegistration(email: string, password: string, token: string, name: string): Promise<any> {
    return this.createPromise(STATEMENT.memberDefinitiveRegistration, {
        email:email,
        password:password,
        token:token,
        name:name,
    })
}

}
