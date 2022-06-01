import {instance} from "./api";
import { ProfileType } from "../types/types";

type GetStatusResponseType = {
    
}

type UpdateStatusResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: Object
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then((res) => res.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId).then((res) => res.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, { status: status }).then((res) => res.data);
    }
}