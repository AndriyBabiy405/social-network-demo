import React from "react";
import s from "./Post.module.css";

const Post = (props) => {


    return(
        <div className={s.posts}>
                <div className={s.item}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBVogy556cwEVHxx5NA3H8mfNA4ZHW3zaLA&usqp=CAU" />
                {props.message}
                <span>Like: </span>
                {props.likeCount}
                </div>
             </div>
    );
}

export default Post;