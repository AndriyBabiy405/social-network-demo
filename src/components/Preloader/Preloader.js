import React from "react";
import preloader from "../../asets/image/preloader.svg";

let Preloader = (props) => {
    return <div style={ { background: "white" } }>
        <img src={preloader} />
    </div>
}

export default Preloader;