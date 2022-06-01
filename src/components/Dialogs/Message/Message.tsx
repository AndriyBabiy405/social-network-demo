import React from "react";
import s from "./../Dialogs.module.css";

type MessagePropsType = {
    message: string
}

const Message: React.FC<MessagePropsType> = ({message}) => {
    return <div className={s.dialog}>{message}</div>
}

export default Message;