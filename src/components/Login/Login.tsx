import React from 'react';
import { required } from '../../utils/validator/validators';
import { Input } from '../Forms/FormsControl';
import {connect} from "react-redux";
import {login} from "../../Redux/Auth-reducer";
import { Redirect } from 'react-router';
import style from "./../Forms/FormsControl.module.css";
import { AppStateType } from '../../Redux/Redux-store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type MapStatePropsType = {
    isAuth: boolean | null,
}

type MapDispatchPropsType = {
    login: (email: string | null, password: string | null, rememberMe: boolean) => void
}

type OwnPropsType = {
    error: any
}

const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

type LoginPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Login: React.FC<LoginPropsType> = (props) => {
    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        
        <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        email: '',
        password: '',
        captcha: '',
        rememberme: [],
        error: ""
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        
       //alert(JSON.stringify(values, null, 2));
       props.login(values.email,values.password, true );
      }}
    >
      {({ errors, touched }) => (
        <Form>
          
         <Field name="email" type="email" placeholder="email"/>
          {errors.email && touched.email ? <div>{errors.email}</div> : null}

          <Field name="password" placeholder="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}

          <label>
             <Field type="checkbox" name="rememberme" value="true" />
             Remember me
           </label>

           <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>

    // <Form onSubmit={(formObj: any) => {
    //     props.login(formObj.email, formObj.password, formObj.rememberMe)
    // }}>
    //     {({ handleSubmit }) => (
    //         <form onSubmit={handleSubmit}>
    //             <Field placeholder={"email"} name={"email"}
    //                     validate={[required]}
    //                     component={Input}
    //                     />
    //             <Field placeholder={"password"} name={"password"} type={"password"}
    //                     validate={[required]}
    //                     component={Input}
    //                     />
    //             <Field name={"rememberMe"} 
    //                     type={"checkbox"}
    //                     component={Input}
    //                     />
    //             <div className={style.formSumaryError}>
                    
    //                 {props.error}
    //             </div>
                
    //             <button type="submit">Login</button>
                
    //         </form>
    // )}
        
            
        
    //         {/* <Field placeholder={"Password"} name={'password'} component={"input"} />
        
    //         <Field component={"input"} name={'rememberMe'} type={'checkbox'} /> remember me
       
    //         <button>Login</button> */}
    // </Form>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType> (mapStateToProps, {login})(Login);