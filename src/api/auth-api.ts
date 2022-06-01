import {instance} from "./api"
import {ResultCodesEnum} from "./api";

type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

type MeResponseType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseType = {
    userId: number,
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`).then((res) => res.data) 
    },
    login(email: string | null, password: string | null, rememberMe: boolean | null = false) {
        return instance.post<ResponseType<LoginResponseType, ResultCodesEnum>>(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}