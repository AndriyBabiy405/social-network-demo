import React from "react";
import styles from "./FormsControl.module.css";

export const AddMessageForm = ({input, meta, ...props}) => {
    const hasError = meta.touched && input.value == "";
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props} />
            </div>
            {hasError && <span>"Some error"</span>}
        </div>
    )
}