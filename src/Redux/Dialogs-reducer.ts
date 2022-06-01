import { MessageType, DialogsType } from "../types/types";

const ADD_MESSAGES = "ADD-MESSAGES";

let initialState = {
    messagess: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How is your feelisn?"},
        {id: 3, message: "AAAA"},
    ] as Array<MessageType>,
    dialogs:  [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Mykola"},
        {id: 3, name: "Anna"},
        {id: 4, name: "Vitaly"},
        {id: 5, name: "Alex"},
        {id: 6, name: "Valya"},
    ] as Array<DialogsType>
}

export type InitialStateType = typeof initialState;

type DialogsActionType = AddMessageActionCreatorType

const dialogsReducer = (state = initialState, action: DialogsActionType): InitialStateType => {
    switch(action.type) {
        case ADD_MESSAGES:
            let newMessage = {
                id: 4,
                message: action.text
            };
            return { 
                ...state,
                messagess: [...state.messagess, newMessage],
            }
        default:
            return state; 
    }
}

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGES, 
    text: string
}

export const addMessageActionCreator = (text: string): AddMessageActionCreatorType => ({type: ADD_MESSAGES, text});

export default dialogsReducer;