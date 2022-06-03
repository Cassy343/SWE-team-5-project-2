import React from "react";
import {useState} from "react";
import {CardMedia, Divider,Typography, Button, Card, CardContent,Container, Toolbar} from "@mui/material";
import '../top-songs/TopSongs.css'
import { useEffect } from "react";
import axios from "axios";
import {ProfileContext} from '../Context'
import { useContext } from "react";
import Artist from "./Artist";
import Helmet from "react-helmet";


function TopArtists(props) {
    const [artistsData, setArtistsData] = useState([])
    const [timeRange, setTimeRange] = useState('long_term');
    const [profileArtists, setProfileArtists] = useState([]);
    const profile = useContext(ProfileContext)
    const user = profile.name

    useEffect(() => {
        const update = async () => {
            const topRes = await axios.get(`profile/top-artists?spotifyToken=${profile.spotifyToken}&timeRange=${timeRange}`)
            const displayRes = await axios.get(`profile?spotifyToken=${profile.spotifyToken}`);
            setProfileArtists(displayRes.data.profileArtists);
            setArtistsData(topRes.data)
            console.log(topRes.data)
        }

        update();
    }, [timeRange]);

      const buttonStyle = {
        padding: '5px', 
        paddingInline: '50px',
        flex: .4,
    }

    return (<>
        <Helmet><title>Top Artists</title></Helmet>
        <div>
        <Toolbar variant='dense' style={{padding: '0px', minHeight: '80px' }}>
            <Container maxWidth='2000px' style={{padding: 'none', display: "flex",}}>
            <Typography style={{textAlign: "center", padding: '10px', flex: 0.6, fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}variant='h4'>{user}'s<br></br> Top Artists</Typography>
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
        {artistsData.map((artist) => {
            const onProfile = profileArtists.filter(sid => artist.id === sid).length > 0;

            return (<Artist
                key={artist.id}
                artist={artist}
                onClick={() => {
                    if (!onProfile) {
                        const newArtistSongs = [...profileArtists, artist.id];
                        axios.put(`profile?firestoreId=${profile.id}`, {
                            profileArtists: newArtistSongs
                        });
                        setProfileArtists(newArtistSongs);
                    }
                }}
                green={onProfile}
                clickable={!onProfile}
            />)
        })}
        </Container>
    </div>
    </>);
}

export default TopArtists;