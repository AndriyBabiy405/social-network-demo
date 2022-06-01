import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../Redux/Profile-reducer";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {maxLengthCreator, required} from "../../../../utils/validator/validators"
import { Textarea } from "../../../Forms/FormsControl";

const MyPosts = (props) => {

    let postsElements = props.posts.map ((p) => <Post message={p.message} likeCount={p.likesCount} />)

    let newPostElement = React.createRef();

    const maxLength10 = maxLengthCreator(10);

    let onAddPosts = (values) => {
        let text = values.post;
        // let text = newPostElement.current.value;
        props.addPosts(text);
    }

    const PostSchema = Yup.object().shape({
        post: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required')
      });


    return(
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>

            <Formik
      initialValues={{
        post: ''
      }}
      validationSchema={PostSchema}
      onSubmit={(values, actions) => {
       onAddPosts(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          
         <Field name="post" type="post" placeholder="post"/>

           <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>

                {/* <Form onSubmit={onAddPosts}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name={'post'} 
                            validate={[required, maxLength10]} 
                            component={Textarea} placeholder={"Post message"}>
                        </Field>
                        <button type="submit">Add post</button> */}
                        {/* <textarea onChange={onPostChange} ref={newPostElement} 
                            value={props.newPostText} /> */}
                    
                    
                        {/* <button onClick={ onAddPosts }>Add post</button> */}
                    
                    {/* </form>
                )}
                </Form> */}
                    
                <div className={s.posts}>
                    { postsElements }
                </div>
            </div>
        </div>
    );
}

export default MyPosts;