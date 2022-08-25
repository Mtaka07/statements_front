import BasicResponse from "./basicResponse";

export interface memberEntity {
    id: number,
    mail: string,
    name: string,
    password: string,
    status: number,
}

export default interface Member extends BasicResponse {
    data:memberEntity,
}