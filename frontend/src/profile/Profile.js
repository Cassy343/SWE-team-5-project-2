
import { FormLabel, FormControl, FormGroup, FormControlLabel, Switch, Box, styled, Grid, Card, Typography, Container} from "@mui/material";
import axios from "axios"
import { ProfileContext } from "../Context"
import { useState, useEffect, useContext } from "react";
import Song from "../top-songs/Song";
import Artist from "../top-artists/Artist";

function Profile(props) {
    const [artist, setArtists] = useState([{name: "Imagine Dragons"},{name: "Ye"},{name: "Elton John"}]);
    const [song, setSongs] = useState([{title: "Enemy"}, {title: "Believer"}, {title: "Thunder"}]);
    const [privateProfile, setPrivateProfile] = useState({private: false});
    const profile = useContext(ProfileContext);
    const [displayData, setDisplayData] = useState({
        profileSongs: [],
        profileArtists: [],
        pfp: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
    });

    useEffect(() => {
        console.log(profile.id);
        axios.get(`profile/display-info?spotifyToken=${profile.spotifyToken}&firestoreId=${profile.id}`)
            .then(res => setDisplayData(res.data));
    }, []);
  
    return (<>

        <Typography variant='h1' style={{textAlign: "center", padding: '10px', fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}>{profile.name}</Typography>
        <img style={{display: 'block',
        margin: 'auto',
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '60%'
        }}src={displayData.pfp} alt='Profile Picture' />
        <Box
            display='flex'
            flexDirection='row'
        >
            <Box
                display='flex-left'
                flexDirection='column'
                alignItems='center'
                width='50vw'
            >
                <Typography align='center' style={{ color: "rgb(30,215,96)",}}variant='h2'>
                    Featured Songs
                </Typography>
                <Container sx={{m: 2}} style={{ padding: '0px', overflow: 'auto', paddingLeft: '75px',}}>
                    {displayData.profileSongs.map((song) => {
                        return (
                            <Song
                                key={song.id}
                                green={false}
                                clickable={false}
                                onClick={() => {}}
                                song={song}
                            />
                        );
                    })}
                </Container>
            </Box>
            <Box
                display='flex-right'
                flexDirection='column'
                alignItems='center'
                width='50vw'
            >
                <Typography  align='center' style={{ color: "rgb(30,215,96)", }} variant='h2'>
                    Featured Artists
                </Typography>
                <Container sx={{m: 2}} style={{ padding: '0px', overflow: 'auto', paddingLeft: '75px'}}>
                    {displayData.profileArtists.map((artist) => {
                        return (
                            <Artist
                                key={artist.id}
                                green={false}
                                clickable={false}
                                onClick={() => {}}
                                artist={artist}
                            />
                        );
                    })}
                </Container>
            </Box>
        </Box>
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