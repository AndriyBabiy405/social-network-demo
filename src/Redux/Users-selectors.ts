import { createSelector } from "reselect";
import { getUsers } from "./Users-reducer";
import { AppStateType } from "./Redux-store";

const requestUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getUsersSuperSelector = createSelector(requestUsersSelector, 
    (users) => {

    return users.filter(u => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}