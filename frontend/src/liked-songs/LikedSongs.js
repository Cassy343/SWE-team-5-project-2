import React from "react";
import {useState} from "react";
import {CardMedia, Divider,Typography, Button, Card, CardContent,Container, Toolbar} from "@mui/material";
import '../top-songs/TopSongs.css'
import { useEffect } from "react";
import axios from "axios";
import {ProfileContext} from '../Context'
import { useContext } from "react";
import Helmet from "react-helmet";

function LikedSongs(props) {
    const[songsData, setSongsData] = useState([])
    const profile = useContext(ProfileContext)
    const user = profile.name

    useEffect( () =>{
        axios.get(`profile/liked-songs?spotifyToken=${profile.spotifyToken}`)
        .then(res => {setSongsData(res.data)
        }
        )
      }, [])

      const buttonStyle = {
        padding: '5px', 
        paddingInline: '50px',
        flex: .4,
    }

    return (<>
    <Helmet><title>Liked Songs</title></Helmet>
    <div>
        <Toolbar variant='dense' style={{minHeight: '80px' }}>
            <Container maxWidth='2000px' style={{ paddingLeft: '130px',display: "flex",}}>
            <Typography style={{ textAlign: "center", padding: '10px', fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}variant='h4'>{profile.name}'s <br></br> Liked Songs</Typography>
            </Container>
        </Toolbar>
        <Divider ></Divider>
        <Container maxWidth='false' sx={{m: 2}} style={{ padding: '0px', overflow: 'auto'}}>
        {songsData.map((song) =>  (
            <div onClick={() => (
                window.open(song.external_urls.spotify)
            )}>
            <Card variant="elevation" sx={{m: 1.8}} style={{width: '325px', height: '325px', float: 'left' , padding: '10px', backgroundColor: "SlateGrey", boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}}}>
                  <CardContent>
                      <CardMedia
                      component="img"
                      height='240'
                      width='200'
                      image={song.track.album.images[1].url}
                      alt='Album Cover Not Found'

                      />
                  <Typography    sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', }}
display='inline' variant='h5'style={{fontWeight: 'bold', }}>{song.track.name}</Typography>
                <Typography variant ='h6'>{song.track.album.artists[0].name}</Typography>     
                </CardContent>   
            </Card>
            </div>
        ))}
        </Container>
    </div>
    </>
    );
}

export default LikedSongs;