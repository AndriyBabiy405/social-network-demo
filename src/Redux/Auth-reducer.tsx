// import { FORM_ERROR } from "final-form";
import { stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api";
import { AppStateType } from "./Redux-store";
import { ThunkAction } from "redux-thunk";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean
}

export type InitialStateType = typeof initialState;

type AuthActionType = SetAuthUsersDataActionType

const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch(action.type) {
        case SET_USER_DATA:
            return { 
                ...state,
                ...action.data,
                isAuth: true,
                id: action.data.id,
            }
        default:
            return state; 
    }
}

type SetAuthUsersDataActionType = {
    type: typeof SET_USER_DATA,
    data: InitialStateType
}

export const setAuthUsersData = (id: number | null , email: string | null, login: string | null, isAuth: boolean): SetAuthUsersDataActionType => ({type: SET_USER_DATA, data: {id, email, login, isAuth}});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType>

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === 0) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUsersData(id, login, email, true));
    } 
}

export const login = (email: string | null, password: string | null, rememberMe: boolean): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            // let action = stopSubmit("login", {_error: "Email is  wrong"});
            // dispatch(action);
            // return { [FORM_ERROR]: 'Login Failed'}
        }
}

export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 1) {
        dispatch(setAuthUsersData(null, null, null, false));
    } 
}

export default authReducer;
