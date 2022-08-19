import BasicResponse from "./basicResponse";

export interface emailVerificationEntity {
    id: number,
    email: string,
    status: number,
    token: string,
    created_at: string,
    updated_at: string,
}

export default interface EmailVerification extends BasicResponse {
    data:emailVerificationEntity,
}