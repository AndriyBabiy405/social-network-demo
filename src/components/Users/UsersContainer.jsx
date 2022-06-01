import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import store from '../../Redux/Store';
import { follow, unfollow, actions } from '../../Redux/Users-reducer';
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import { getUsers } from '../../Redux/Users-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedict';
import { compose } from 'redux';
import { UserType } from '../../types/types';
import { getCurrentPage, getPageSize, getTotalUsersCount, getIsFetching, getFollowingInProgress, getUsersSuperSelector } from '../../Redux/Users-selectors';
import { AppStateType } from '../../Redux/Redux-store';

// type UserContainerComponentType = {
//     totalUsersCount: number,
//     pageSize: number,
//     currentPage: number,    
//     users: any | Array<UserType>,
//     onPageChanged: boolean,
//     follow: boolean,
//     unfollow:  boolean,
//     getUsers: any,
//     toggleFollowingProgress: any | Array<number>,
//     isFetching: any,
// }

// type MapStatePropsType = {
//     currentPage: number,
//     pageSize: number,
//     isFetching: boolean,
//     totalUsersCount: number,
//     users: Array<UserType>,
//     followingInProgress: Array<number> | any
// }

// type MapDispatchPropsType = {
//     follow: (userId: number) => void,
//     unfollow: (userID: number) => void,
//     getUsers: (currentPage: number, pageSize: number) => void,
//     toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
// }

// type OwnPropsType = {
//     pageTitle: string
// }

// type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
let {toggleIsFollowingProgress} = actions;

class UsersContainer extends React.Component {

    

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
       
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {

        

        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize} 
                      currentPage={this.props.currentPage} 
                      users={this.props.users}
                      onPageChanged={this.onPageChanged}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow} 
                      followingInProgress={this.props.followingInProgress}
        />
        </> 
    }
}


// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
        return {
            users: getUsersSuperSelector(state),
            pageSize: getPageSize(state),
            totalUsersCount: getTotalUsersCount(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            followingInProgress: getFollowingInProgress(state)
        }
    }

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow, toggleIsFollowingProgress, getUsers}
))(UsersContainer)