import React from "react";
import Dialogs from "./Dialogs";
import {addMessageActionCreator} from "../../Redux/Dialogs-reducer";
import {connect} from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedict";
import {compose} from "redux";
import { DialogsType, MessageType } from "../../types/types";
import { AppStateType } from "../../Redux/Redux-store";

type MapStatePropsType = {
    dialogsPage: object,
    dialogs: Array<DialogsType>,
    message: Array<MessageType>
}

type MapDispatchPropsType = {
    addMessage: (text: string) => void
}

type OwnPropsType = {

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        dialogs: state.dialogsPage.dialogs,
        message: state.dialogsPage.messagess
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        addMessage: (text: string) => {
            dispatch(addMessageActionCreator(text));
        }
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs); 