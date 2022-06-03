
import { FormLabel, FormControl, FormGroup, FormControlLabel, Switch, Box, styled, Grid, Card, Typography, Container} from "@mui/material";
import axios from "axios"
import { ProfileContext } from "../Context"
import { useState, useEffect, useContext } from "react";
import Song from "../top-songs/Song";

function Profile(props) {
    const [artist, setArtists] = useState([{name: "Imagine Dragons"},{name: "Ye"},{name: "Elton John"}]);
    const [song, setSongs] = useState([{title: "Enemy"}, {title: "Believer"}, {title: "Thunder"}]);
    const [privateProfile, setPrivateProfile] = useState({private: false});
    const profile = useContext(ProfileContext);
    const [displayData, setDisplayData] = useState({
        profileSongs: [],
        profileArtists: []
    });

    useEffect(() => {
        console.log(profile.id);
        axios.get(`profile/display-info?spotifyToken=${profile.spotifyToken}&firestoreId=${profile.id}`)
            .then(res => setDisplayData(res.data));
    }, []);
  
    return (<>
        <Container maxWidth='false' sx={{m: 2}} style={{ padding: '0px', overflow: 'auto'}}>
            {displayData.profileSongs.map((song) => {
                return (
                    <Song
                        key={song.id}
                        green={false}
                        onClick={() => {}}
                        song={song}
                    />
                );
            })}
        </Container>
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