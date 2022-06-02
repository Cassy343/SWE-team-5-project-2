
import { FormLabel, FormControl, FormGroup, FormControlLabel, Switch, Box, styled, Grid, Card, Typography} from "@mui/material";
import axios from "axios"
import { ProfileContext } from "../Context"
import { useState, useEffect, useContext } from "react";

function Profile(props) {
  const testuname = "Javier Tarifa"
  const profile = useContext(ProfileContext)
  const [privateProfile, setPrivateProfile] = useState({private: false});
  const [artist, setArtists] = useState([{name: "Imagine Dragons"},{name: "Ye"},{name: "Elton John"}]);
  const [song, setSongs] = useState([{title: "Enemy"}, {title: "Believer"}, {title: "Thunder"}]);
 useEffect(()=> {
 // axios.get(`profile?spotifyToken=${window.localStorage.getItem("token")}`)
 //   .then(res => { console.log()});
   // axios.get('localhost8000:profile')
 },[]);
    return (
    <>
        <div className = "App">
            <br></br>
            <Typography variant = "h3">{testuname}</Typography>
            <div>
              <Grid container spacing = {2}>
                <Grid item>
                 <Grid container>
                   <Grid item>
                   <div className = "user_artists">
                  <p>Artists</p>
                    {artist.map((artist)=>
                        <Box width={240}>
                       <Card sx={{m: 2}}  style={{backgroundColor: "green", opacity: 0.9, boxShadow: "0 8px 10px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}, padding: '5px', borderRadius: '2%'}}>
                          <Typography variant="h5" color='black' textAlign='center' style={{fontWeight: "bold"}}>{artist.name}</Typography>
                       </Card>  
                       </Box>                    
                    )}
                  </div>
                   </Grid>
                   <Grid item>
                   <div className = "user_songs">
                  <p>Songs</p>
                    {song.map((song)=>
                        <Box width={240}>
                       <Card sx={{m: 2}}  style={{backgroundColor: "green", opacity: 0.9, boxShadow: "0 8px 10px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}, padding: '5px', borderRadius: '2%'}}>
                          <Typography variant="h5" color='black' textAlign='center' style={{fontWeight: "bold"}}>{song.title}</Typography>
                       </Card>  
                       </Box>                    
                    )}
                  </div>
                   </Grid>
                 </Grid>
                </Grid>
                <Grid item xs={6} ms={6}>
                    <FormControl>
                        <FormLabel>
                            <FormGroup>
                                <FormControlLabel control = { <Android12Switch defaultChecked />} 
                                label = "Private Profile" labelPlacement="top" onClick ={() => (privateProfile.private = !privateProfile.private)}/>
                                {console.log(privateProfile)}
                            </FormGroup>
                        </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
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
      '&before':{
      }
     
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      //color: "rgb(30,215,96)",

      height: 16,
      margin: 2,
    },
  }));

 const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}
export default Profile;