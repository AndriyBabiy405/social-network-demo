import { UserType } from "../types/types";
import {instance} from "./api";

type GetUsersResponsetype = {
    users: Array<UserType>,
    totalCount: number,
    error: string | null,
    items: any
}

type FollowUserResponsetype = {
    resultCode: number,
    messages: Array<string>,
    data: object
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponsetype>(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
    },
    follow(userId: number) {
        return instance.post<FollowUserResponsetype>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
}