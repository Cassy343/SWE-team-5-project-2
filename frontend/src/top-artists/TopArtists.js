import React from "react";
import {useState} from "react";
import {CardMedia, Divider,Typography, Button, Card, CardContent,Container, Toolbar} from "@mui/material";
import '../top-songs/TopSongs.css'
import { useEffect } from "react";
import axios from "axios";
import {ProfileContext} from '../Context'
import { useContext } from "react";


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

    return (        <div>
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
        {artistsData.map((artist) =>  {
            const onProfile = profileArtists.filter(sid => artist.id === sid).length > 0;
            // <div onClick={() => (
            //     window.open(artist.external_urls.spotify)
            // )}>
            return(
            <Card variant="elevation" 
                sx={{m: 1.8}}
                onClick={() => {
                    if (!onProfile) {
                        const newArtistSongs = [...profileArtists, artist.id];
                        axios.put(`profile?firestoreId=${profile.id}`, {
                            profileArtists: newArtistSongs
                        });
                        setProfileArtists(newArtistSongs);
                    }
                }}           
                style={{
                    width: '325px', 
                    height: '325px', 
                    float: 'left' , 
                    padding: '10px', 
                    backgroundColor: "SlateGrey", 
                    boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
                    backgroundColor: onProfile ? 'rgb(30,215,96)' : "SlateGrey",
                    cursor: onProfile ? 'auto' : 'pointer',
                    "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}}}>
                  <CardContent>
                      <CardMedia
                      component="img"
                      height='240'
                      width='200'
                      image={artist.images[1].url}
                      alt='Artist Picture Not Found'

                      />
                  <Typography    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', }}
display='inline' variant='h5'style={{fontWeight: 'bold', }}>{artist.name}</Typography>
                <Typography variant ='h6'>Followers: {artist.followers.total}</Typography>     
                </CardContent>   
            </Card>
            // </div>
            );
})}
        </Container>
    </div>);
}

export default TopArtists;