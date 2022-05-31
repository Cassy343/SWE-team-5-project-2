import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Forums(props) {

    const [newForumName, setNewForumName] = useState("");
    const [newImageLink, setNewImageLink] = useState("");

    return (
        <div style={{ textAlign: 'center', marginLeft: '70px', marginRight: '70px' }}>
            <h1>FORUMS</h1>
            <Grid container spacing={4}>
                <Grid item xs={3}><p></p></Grid>
                <Grid item xs={2}><p><b>Create a new forum: </b></p></Grid>
                <Grid item xs={2}>
                    <TextField fullWidth
                    id="standard-basic" 
                    variant="standard"
                    helperText = "Forum Name"
                    onChange={(e) => setNewForumName(e.target.value)}
                    inputProps={{ defaultValue: null }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField fullWidth
                    id="standard-basic" 
                    variant="standard"
                    helperText = "Image Link"
                    onChange={(e) => setNewImageLink(e.target.value)}
                    inputProps={{ defaultValue: null }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button color='success'>Create</Button>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <br></br>
            <Box>
                <Card sx={{ maxWidth: 200}}>
                <CardActionArea href="forums/posts">
                    <CardMedia
                    component="img"
                    height="140"
                    alt="spotify logo"
                    image='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/768px-Spotify_logo_without_text.svg.png'
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        What's your favorite artist?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        10 posts
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </Box>
        </div>
    );
}

export default Forums;