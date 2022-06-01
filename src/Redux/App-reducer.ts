// import { FORM_ERROR } from "final-form";

import * as axios from "axios";
import { getAuthUserData } from "./Auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return { 
                ...state,
                initialized: true
            }
        default:
            return state; 
    }
}

type InitialSuccuessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitialSuccuessActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
//     axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
//         withCredentials: true
//     })
//     .then(response => {
//         if (response.data.resultCode === 0) {
//             let {id, login, email} = response.data.data;
//              this.props.setAuthUsersData(id, login, email);
//         } 
// });
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;
