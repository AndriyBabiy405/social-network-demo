import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ff2cb1fa-5f52-46ac-8f38-ad7037e1affe"
    }
})

export enum ResultCodesEnum {
    Succes = 0, 
    Error = 1
}


export const getUsers2 = (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => {
        return response.data;
    })
}




