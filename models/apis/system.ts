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

public static definitiveRegistration(token: string, email: string, password: string, name: string): Promise<any> {
    return this.createPromise(STATEMENT.memberDefinitiveRegistration, {
        token:token,
        email:email,
        password:password,
        name:name,
    })
}

}
