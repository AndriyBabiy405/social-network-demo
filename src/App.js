import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import { addMessages, updateNewMessageText } from './Redux/Store';
import Login from './components/Login/Login';
import {setAuthUsersData} from "./Redux/Auth-reducer";
import * as axios from "axios";
import { authAPI } from './api/api';
import { connect } from 'react-redux';
import {initializeApp} from "./Redux/App-reducer";
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Preloader from './components/Preloader/Preloader';
import store from "./Redux/Redux-store";
import {Provider} from 'react-redux';

class App extends React.Component {

    componentDidMount() {
        // this.props.getAuthUserData();
        //     axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //         withCredentials: true
        //     })
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             let {id, login, email} = response.data.data;
        //              this.props.setAuthUsersData(id, login, email);
        //         } 
        // });
        this.props.initializeApp();
    }
    
    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }
        

        return (
        <div>
            <div className="header-bg">
                <div className="app-wrapper">
                        <HeaderContainer />
                </div>
            </div>
           
            <div className="app-wrapper-content">
                <Navbar />
                <div  className="content">
                <Route path="/dialogs" 
                        render={ () => <DialogsContainer />} />
                    <Route path="/profile/:userId?" 
                        render={ () => <ProfileContainer />} />
                    <Route path="/users"
                        render={ () => <UsersContainer pageTitle={"Users"} />} />
                    <Route path="/news" 
                        render={ () => <News />} />
                    <Route path="/music" 
                        render={ () => <Music />} />
                    <Route path="/settings" 
                        render={ () => <Settings />} />
                    <Route path="/login" 
                        render={ () => <Login />} /> 
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose( 
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);;

let SamuraiApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiApp;