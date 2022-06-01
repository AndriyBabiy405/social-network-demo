// let rerenderEntireTree = () => {
//     console.log("state changed");
// }

import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import sidebarReducer from "./Sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts:  [
                {id: 1, message: "Hi, how are you?", likesCount: 12}, 
                {id: 2, message: "It's my first post", likesCount: 11}, 
                {id: 3, message: "balabalbalab", likesCount: 1223}, 
                {id: 4, message: "greeeat", likesCount: 111}, 
            ],
            newPostText: "it-kamasutra.com"
        },
        dialogsPage: {
            messagess: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your feelisn?"},
                {id: 3, message: "AAAA"},
            ],
            newMessageText: "",
            dialogs:  [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Mykola"},
                {id: 3, name: "Anna"},
                {id: 4, name: "Vitaly"},
                {id: 5, name: "Alex"},
                {id: 6, name: "Valya"},
            ]
        },
        sidebar: {}
    },
    _callSubscriber(){
        console.log("state changed");
    },
    getState(){
        return this._state;
    },
    dispatch(action){

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    },
    subscribe(observer){
        this._callSubscriber = observer;
    }
}



 
// export const addPosts = (postMessage) => {
//     let newPost = {
//         id: 5,
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = '';
//     rerenderEntireTree(state);
// }

// export const updateNewPostText = (newText) => {
//     state.profilePage.newPostText = newText;
//     rerenderEntireTree(state);
// }

// export const addMessages = () => {
//     let newMessage = {
//         id: 4,
//         message: state.dialogsPage.newMessageText
//     }
//     state.dialogsPage.messagess.push(newMessage);
//     state.dialogsPage.messagess.newMessageText = "";
//     rerenderEntireTree(state);
// }

// export const updateNewMessageText = (newText) => {
//     state.dialogsPage.newMessageText = newText;
//     rerenderEntireTree(state);
// }

// export const subscribe = (observer) => {
//     rerenderEntireTree = observer;
// }

export default store;