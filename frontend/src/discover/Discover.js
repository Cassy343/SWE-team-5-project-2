import React from "react";
import {useState} from "react";
import {Typography, Button, Card, CardActionArea, CardActions, CardContent} from "@mui/material";
import '../discover/Discover.css'
import Profile from '../profile/Profile'

function Discover(props) {
    const [IdProfile, setIdProfile] = useState();
    const [users, setUsers] = useState([{
        name: 'Ashwin Shankar',
        song: "It's a killa",
        artist: 'Glass Animals',
        userId: '1235'
    }, 
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    },
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    },
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    },
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    },
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    },
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    },

]) // each user will contain name, top artist, top song, 


    return (<>
        <div className="content-container">
            <div className="row">
                <div className="left-panel box">
                    {users.map((user) => (
                        <div onClick = {() => setIdProfile(user.userId)}>
                        <Card sx={{m: 2}} style={{backgroundColor: "rgb(30,215,96)", opacity: 0.9, boxShadow: "0 8px 10px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}, padding: '5px', borderRadius: '2%'}}>
                            <CardActionArea>
                                <Typography variant="h5" color='black' textAlign='center' style={{fontWeight: "bold"}}>{user.name}</Typography>
                            <CardContent style={{padding: '5px'}}>
                                <Typography style={{width: "200px", float: "left"}}color='grey' variant='h6'> Favorite Song:<br></br> {user.song}</Typography>
                                <Typography color='grey' variant='h6'> Favorite Artist: {user.artist} </Typography>
                            </CardContent>
                            <CardActions>
                                <Button  fullWidth ='true' variant='text' size='small'>
                                        <Typography color ='black' variant='h7'>
                                            View Profile
                                        </Typography>
                                </Button>
                                </CardActions>
                                </CardActionArea>
                           
                                
                        </Card>
                    </div>)
                    )}
                </div>
                <div className="right-panel box">
                    <Profile userId = {IdProfile}></Profile>
                </div>
            </div>
        </div>
    </>);
}

export default Discover;