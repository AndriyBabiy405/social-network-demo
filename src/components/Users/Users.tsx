import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../asets/image/user.png";
import { NavLink } from "react-router-dom";
import * as axios from "axios";
import Paginator from "../Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { follow, unfollow } from '../../Redux/Users-reducer';

type UsersPropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    followingInProgress: Array<number>,
    users: Array<UserType>,
}

let Users: React.FC<UsersPropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return <div>
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged} 
                totalItemsCount={totalUsersCount} pageSize={pageSize} />
{
    users.map( u => <User user={u} 
                                key={u.id} 
                                followingInProgress={props.followingInProgress}
                                follow={follow}
                                unfollow={unfollow}
                                 />)
}
</div>   
}


export default Users;