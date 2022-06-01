import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import {ResultCodesEnum} from "../api/api";
import { usersAPI } from "../api/users-api";
import { PhotosType, UserType } from "../types/types";
import { updateObjectInArray } from "../utils/validator/object-helpers";
import { AppStateType, InferActionsType } from "./Redux-store";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';



let initialState = {
    users : [
        
    ] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> 
}

export type InitialStateType = typeof initialState;

type ActionUsersType = InferActionsType<typeof actions>;

const usersReducer = (state = initialState, action: ActionUsersType): InitialStateType => {
    switch(action.type) {
        case FOLLOW: 
            return { 
                ...state, 
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }


        case UNFOLLOW: 
            return { 
                ...state, 
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }


        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users] }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { ...state, 
                    followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id != action.userId)}
        }

        default:
            return state; 
    }
}



export const actions = {
    followSuccess: (userId: number) => ({type: FOLLOW, userId } as const),
    unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId } as const),
    setUsers: (users: any) => ({ type: SET_USERS, users }as const),
    setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const)
}

type DispatchType = Dispatch<ActionUsersType>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionUsersType>

// type DispatchType = Dispatch<ActionUsersType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, pageSize);
            dispatch(actions.toggleIsFetching(false));
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionUsersType ) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId)); 
    let response = await apiMethod(userId);
        if (response.data.resultCode == ResultCodesEnum.Succes) {
            dispatch(actionCreator(userId));
        }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);    
    }
}

export default usersReducer;