import React from "react";
import {useState} from "react";
import {CardMedia, Divider,Typography, Button, Card, CardContent,Container, Toolbar} from "@mui/material";
import '../top-songs/TopSongs.css'
import { useEffect } from "react";
import axios from "axios";
import {ProfileContext} from '../Context'
import { useContext } from "react";
import Song from "./Song";

function TopSongs(props) {
    const [songsData, setSongsData] = useState([])
    const [timeRange, setTimeRange] = useState('long_term');    
    const [profileSongs, setProfileSongs] = useState([]);
    const profile = useContext(ProfileContext)
    const user = profile.name

    useEffect(() => {
        const update = async () => {
            const topRes = await axios.get(`profile/top-songs?spotifyToken=${profile.spotifyToken}&timeRange=${timeRange}`);
            const displayRes = await axios.get(`profile?spotifyToken=${profile.spotifyToken}`);
            setProfileSongs(displayRes.data.profileSongs);
            setSongsData(topRes.data);
        };
        
        update();
    }, [timeRange]);

    const buttonStyle = {
        padding: '5px', 
        paddingInline: '50px',
        flex: .4,
    }
    return (
        <div>
            <Toolbar variant='dense' style={{padding: '0px', minHeight: '80px' }}>
                <Container maxWidth='2000px' style={{padding: 'none', display: "flex",}}>
                <Typography style={{textAlign: "center", padding: '10px', flex: 0.6, fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}variant='h4'>{user}'s<br></br> Top Songs</Typography>
                <Button size='medium'  style={buttonStyle} variant='text' onClick={() => setTimeRange('long_term')}>
                <Typography color ='black' variant='h5'>
                                            All Time
                                        </Typography>
                    </Button>
                <Button size='small' variant='text' style={buttonStyle} onClick={() => setTimeRange('medium_term')}>
                <Typography color ='black' variant='h5'>
                                            Last Year
                                        </Typography>
                </Button>
                <Button size='small' style={buttonStyle} variant='text' onClick={() => setTimeRange('short_term')}>
                <Typography color ='black' variant='h5'>
                                            Last Month
                                        </Typography>
                </Button>
                </Container>
            </Toolbar>
            <Divider ></Divider>
            <Container maxWidth='false' sx={{m: 2}} style={{ padding: '0px', overflow: 'auto'}}>
            {songsData.map((song) => {
                const onProfile = profileSongs.filter(sid => song.id === sid).length > 0;

                return (
                    <Song
                        key={song.id}
                        green={onProfile}
                        clickable={!onProfile}
                        onClick={() => {
                            if (!onProfile) {
                                const newProfileSongs = [...profileSongs, song.id];
                                axios.put(`profile?firestoreId=${profile.id}`, {
                                    profileSongs: newProfileSongs
                                });
                                setProfileSongs(newProfileSongs);
                            }
                        }}
                        song={song}
                    />
                );
            })}
            </Container>
        </div>
    )



}

export default TopSongs;