import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../asets/image/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";
import * as axios from "axios";
import Paginator from "../Paginator/Paginator";
import { useDispatch } from "react-redux";


type UserComponentType = {
    user: any | Array<UserType>,
    followingInProgress: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
} 

let User = ({user, followingInProgress, follow, unfollow}: UserComponentType) => {
    const dispatch = useDispatch();
    console.log(user);

    return <div>
    <div key={user.id}>
        <span>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>
            <div>
                { user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={ () => {
                    dispatch(unfollow(user.id));
                    } }>Unfollow</button>

                    : 
                    
                    <button disabled={followingInProgress.some(id => id === user.id)} onClick={ () => {
                        dispatch(follow(user.id));
                        } }>Follow</button>}
            </div>
        </span>
        <span>
            <span>
                <div>{user.name}</div><div>{user.status}</div>
            </span>
            <span>
                <div>{"user.location.city"}</div><div>{"u.location.country"}</div>
            </span>
        </span>
    </div>)
</div>   
}

export default User;