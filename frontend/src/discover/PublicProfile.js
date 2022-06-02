import React from "react";
import {useLocation} from 'react-router-dom'

function PublicProfile(props){
    const location = useLocation();
    const id = location.state?.id;
    return(
        <div>
            {id}
        </div>
    )
}

export default PublicProfile;