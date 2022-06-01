import { profileAPI } from "../api/profile-api";
import { usersAPI } from "../api/users-api";
import { PostType, ProfileType } from "../types/types";
import { AppStateType } from "./Redux-store";
import { ThunkAction } from "redux-thunk";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = 'SET_STATUS';


let initialState = {
    posts:  [
        {id: 1, message: "Hi, how are you?", likesCount: 12}, 
        {id: 2, message: "It's my first post", likesCount: 11}, 
        {id: 3, message: "balabalbalab", likesCount: 1223}, 
        {id: 4, message: "greeeat", likesCount: 111}, 
    ] as Array<PostType>,
    newPostText: "it-kamasutra.com",
    profile: null as ProfileType | null,
    status: "",
}

export type InitialStateType = typeof initialState;

type ProfileActionType = AddPostActionCreatorType | UpdateNewPostTextActionCreatorType | SetUsersProfileACType | SetStatus

const profileReducer = (state = initialState, action: ProfileActionType): InitialStateType => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    text: string
}

export const addPostActionCreator = (text: string): AddPostActionCreatorType => ({type: ADD_POST, text});

type UpdateNewPostTextActionCreatorType = {
    type: typeof UPDATE_NEW_POST_TEXT,
    newText: string
}

export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextActionCreatorType => ({type: UPDATE_NEW_POST_TEXT, newText: text });

type SetUsersProfileACType = {
    type: typeof SET_USERS_PROFILE,
    profile: ProfileType 
}

export const setUsersProfileAC = (profile: any): SetUsersProfileACType => ({type: SET_USERS_PROFILE, profile});

type SetStatus = {
    type: typeof SET_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatus => ({type: SET_STATUS, status});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionType>

export const profileThunk = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    console.log(data);
    dispatch(setUsersProfileAC(data));
}

export const getStatus = (userId: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0){
        dispatch(setStatus(status));
    }
}

export default profileReducer;