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
        userId: '12345'
    }, 
    {
        name:'Spongebob Squarepants',
        song: 'Krusty Krab Pizza',
        artist: 'Squidward',
        userId: '12345'
    }]) // each user will contain name, top artist, top song, 


    return (<>
        <div className="content-container">
            <div className="row">
                <div className="left-panel box">
                    {users.map((user) => (
                        <Card sx={{m: 2}} style={{backgroundColor: "rgb(30,215,96)", opacity: 0.9}}>
                            <CardActionArea >
                                <Typography variant="h3" color='black' textAlign='center' >{user.name}</Typography>
                            </CardActionArea>
                            <CardContent>
                                <Typography color='grey' variant='h6'> Favorite Song: {user.song}</Typography>
                                <Typography color='grey' variant='h6'> Favorite Artist: {user.artist} </Typography>
                            </CardContent>
                            <CardActions>
                                <Button  sx = {{border: 'black', "&:hover": {border: '1px solid black'}}}fullWidth ='true' variant='outlined' size='small' onClick = { () => {
                                    setIdProfile(user.userId)
                                    }}>
                                        <Typography color ='black' variant='h7'>
                                            View Profile
                                        </Typography>
                                </Button>
                            </CardActions>
                                
                        </Card>
                    )
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