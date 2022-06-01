import React from 'react';
import MyPostsContainer from './MyPosts/Post/MyPostContainer';
import s from "./Profile.module.css";
import Profile from "./Profile";
import { connect } from 'react-redux';
import * as axios from "axios";
import { Redirect, withRouter } from 'react-router';
import { profileThunk, getStatus, updateStatus } from '../../Redux/Profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedict';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  
    componentDidMount() {
        let userId = this.props.userId;
        console.log(this.props.userId);
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.profileThunk(userId);
        //setTimeout(() => {
            this.props.getStatus(userId);
        // }, 1000)
        
    }

    render() {
    return <div>
        <Profile props={this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    </div>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id
 });

export default compose(
    connect(mapStateToProps, {profileThunk, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);