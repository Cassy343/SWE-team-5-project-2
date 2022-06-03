import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Divider, Toolbar, Container } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Helmet} from 'react-helmet';
import './forums.css';

function Forums(props) {
    const [newForumName, setNewForumName] = useState("");
    const [newImageLink, setNewImageLink] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/768px-Spotify_logo_without_text.svg.png");
    const [forums, setForums] = useState([]);
    const [change, setChange] = useState(0);
    

    useEffect(() => {
        fetch("http://localhost:8000/forums/")
        .then((res) => res.json())
        .then((text) => setForums(text.result))
        .catch((err) => console.log(err))
      }, [change])

    const createForum = async () => {
        
        const res = await axios.post("http://localhost:8000/forums/", {
            name: newForumName,
            imageLink: newImageLink
        })
        setForums([...forums, res.data]);
        setChange(change + 1);
        
    }

    return (<>
        <Helmet><title>Forums</title></Helmet>
        <div style={{ textAlign: 'center', marginLeft: '70px', marginRight: '70px', }}>
        <Toolbar variant='dense' style={{minHeight: '80px' }}>
            <Container maxWidth='2000px' style={{ paddingLeft: '130px', display: "flex",}}>
            <Typography style={{paddingLeft: '100px', textAlign: "center", padding: '10px', fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}variant='h4'>Forums</Typography>
            </Container>
        </Toolbar>
            <Divider></Divider>
            <Grid container spacing={4}>
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
                    helperText = "Cover Image Link"
                    onChange={(e) => setNewImageLink(e.target.value)}
                    inputProps={{ defaultValue: null }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button fullWidth
                    sx= {{color: "rgb(30,215,96)", }}
                    onClick={createForum}>Create</Button>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <br></br>
            <Grid container spacing = {1}>
                {forums.map((f) => 
                <Grid item xs ={2}>
                <Box>
                    <Card sx={{ maxWidth: 200}}>
                    <CardActionArea component={Link} to="/forums/posts" state={{ name: f.name}} >
                        <CardMedia
                        component="img"
                        height="140"
                        alt="Cover Image"
                        image={f.imageLink}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {f.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Box>
                </Grid>
                )}
            </Grid>
        </div>
    </>);
}

export default Forums;