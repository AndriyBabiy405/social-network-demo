import React from 'react';
import { connect } from 'react-redux';
import Header from "./Header";
import { getAuthUserData } from '../../Redux/Auth-reducer';
import * as axios from "axios";
import { compose } from 'redux';
import {logout} from "../../Redux/Auth-reducer";
import { AppStateType } from '../../Redux/Redux-store';

type MapStatePropsType = {
    isAuth: boolean,
    login: string | null,
}

type MapDispatchPropsType = {
    logout: () => void
}

type OwnPropsType = {

}

type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    // componentDidMount() {
    //     this.props.getAuthUserData();
    //     //     axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
    //     //         withCredentials: true
    //     //     })
    //     //     .then(response => {
    //     //         if (response.data.resultCode === 0) {
    //     //             let {id, login, email} = response.data.data;
    //     //              this.props.setAuthUsersData(id, login, email);
    //     //         } 
    //     // });
    // }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {logout})) (HeaderContainer);

