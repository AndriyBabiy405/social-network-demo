import React from "react";
import s from "./Dialogs.module.css";
import { NavLink } from 'react-router-dom';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router";
import {maxLengthCreator, required } from "../../utils/validator/validators";
import { Textarea } from "../Forms/FormsControl";
import { DialogsType, MessageType } from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type DialogsPropsType = {
    dialogsPage: object,
    dialogs: Array<DialogsType>,
    message: Array<MessageType>,
    isAuth: boolean,
    addMessage: (text: string) => void
}

const DialogsSchema = Yup.object().shape({
    message: Yup.string()
      .min(1, 'Too Short!')
      .required('Required'),
  });

const Dialogs: React.FC<DialogsPropsType> = ({dialogsPage, dialogs, message, addMessage, ...props}) => {

    const maxLenght50 = maxLengthCreator(50);

    console.log(dialogs);

    let addNewMessage = (values: any) => {
        console.log(values);
        let text = values.message;
        addMessage(text);
    }

    let newMessageElement = React.createRef();


    let dialogsElements = dialogs.map( (dialog) =>
        <DialogItem name={dialog.name} id={dialog.id} />
)
    
    let messagesElements = message.map( (m) => 
        <Message message={m.message} />
 )

    if (props.isAuth == false) return <Redirect to={"/login"} />

    return (
        <div className={s.dialogs}>
                <div className={s.dialogsItems}>

                    { dialogsElements }          

                </div>
        <div className={s.messages}>
           
            { messagesElements }
            
            <Formik
      initialValues={{
        message: ''
      }}
      validationSchema={DialogsSchema}
      onSubmit={(values, actions) => {
        
       //alert(JSON.stringify(values, null, 2));
       addNewMessage(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          
         <Field name="message" type="message" placeholder="message"/>

           <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>

        </div>

        
        {/* <Form onSubmit={addNewMessage}>
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field name={'message'}
                        validate={[required, maxLenght50]}
                        component={Textarea} placeholder={"Post message"}>
                       
                    </Field>
                    <button type="submit">Send</button>
                </form>

            )}
        </Form> */}
        </div>
           
        /* //    <textarea value={props.newMessageText} ref={newMessageElement} onChange={onChangeMessage}></textarea>
        //    <button onClick={onAddMessage} ></button>
        // </div>
        // </div> */
    )
}

export default Dialogs;