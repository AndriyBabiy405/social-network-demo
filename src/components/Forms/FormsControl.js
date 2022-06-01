import React from "react";
import styles from "./FormsControl.module.css";
import {Field} from "redux-form";
import { required } from "../../utils/validator/validators";

export const Textarea = ({input, meta, element, ...props}) => {
    const hasError = meta.touched && input.value == "";
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>"Some error"</span>}
        </div>
    )
}

export const Input = ({input, meta, element, ...props}) => {
    const hasError = meta.touched && input.value == "";
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props} />
            </div>
            {hasError && <span>"Some error"</span>}
        </div>
    )
}

export const CreateField = (placeholder, name, validators, component, props = {}, text = "") => {
    return <div>
        <Field placeholder={placeholder} name={name}
                        validate={validators}
                        component={component}
                        {...props}
                        /> {text}
    </div>
}

// export const Input = (props) => {
//     const {input, meta, child, element, ...restProps} = props;
//     return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
// }

// export const Textarea = (props) => {
//     const {input, meta, child, element, ...restProps} = props;
//     return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
// }