import React, {useState} from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const onStatusChange = (e) => {
        setStatus(
            e.currentTarget.value
        );
    }

    return (
        <div>
            {
            <div>
                <span onDoubleClick={ activateEditMode }>{props.status || "-----"}</span>
            </div>
            }
            {false &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} 
                    value={status}/>
            </div>
            }
        </div>  
    )
  }
  
export default ProfileStatusWithHooks;