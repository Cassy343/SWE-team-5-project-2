
import { FormLabel, FormControl, FormGroup, FormControlLabel, Switch, styled } from "@mui/material";
import axios from "axios"
import { useState, useEffect } from "react";

function Profile(props) {
  const [privateProfile, setPrivateProfile] = useState([]);
 useEffect(()=> {
  axios.get(`profile?spotifyToken=${props.spotifyToken}`)
    .then(res => { console.log(res)});

 },[]);
    return (
    <>
        <div className = "App">
            <br></br>
            <h1>USERNAME</h1>
            <div>
              <section id="sidebar">
                <FormControl>
                    <FormLabel>
                        <FormGroup>
                            <FormControlLabel control = { <Android12Switch defaultChecked />} 
                            label = "Private Profile"/>
                        </FormGroup>
                    </FormLabel>
                </FormControl>
                </section>
            </div>

        </div>
    
    </>);
}
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
     
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));
export default Profile;