import React from "react";
import {useState} from "react";
import {CardActionArea, CardMedia, Divider,Typography, Card, CardContent,Container, Toolbar} from "@mui/material";
import '../discover/Discover.css'
import Profile from '../profile/Profile'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {ProfileContext} from '../Context'
import { useContext } from "react";

function Discover(props) {
    const [IdProfile, setIdProfile] = useState();
    const profile = useContext(ProfileContext)
    const user = profile.name
    let x =[]
    const [users, setUsers] = useState([]) // each user will contain name, top artist, top song, 

    useEffect(() => {
        axios.get(`profile/public?spotifyToken=${profile.spotifyToken}`)
        .then(res => {x = res.data
            setUsers(res.data)
            console.log(users)})
    }, []);



const buttonStyle = {
    padding: '5px', 
    paddingInline: '50px',
    flex: .4,
}
return (
    <div>
        <Toolbar variant='dense' style={{padding: '0px', minHeight: '80px' }}>
            <Container maxWidth='2000px' style={{padding: 'none', display: "flex",}}>
            <Typography style={{textAlign: "center", padding: '10px', fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}variant='h4'>Discover</Typography>
            </Container>
        </Toolbar>
        <Divider ></Divider>
        <Container maxWidth='false' sx={{m: 2}} style={{ padding: '0px', overflow: 'auto'}}>
        {users.map((user) =>  (
            <div>
            <Card variant="elevation" sx={{m: 1.8}} style={{width: '325px', height: '410px', float: 'left' , padding: '10px', backgroundColor: "SlateGrey", boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}}}>
                   <CardActionArea component={Link} to="/discover/publicprofile" state={{id: user.userId}}>
                   <Typography align='center'   sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', }}
display='inline' variant='h5'style={{fontWeight: 'bold', }}>{user.name ? user.name: 'No Name Available'}</Typography>
                  <CardContent >
                      <CardMedia
                      height='200'
                      component="img"
                      image={user.pfp ? user.pfp.url: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'}
                      alt='Album Cover Not Found'
                      sx={{borderRadius: '50%', objectFit: 'cover', width: '200px', margin: 'auto'}}

                      />
                <div style={{display: 'flex'}}>
                <div style={{paddingLeft: '1px', display: 'inline', alignContent: 'center', paddingRight:'100px', textAlign: 'center'}}>
                <Typography  sx={{textOverflow: 'ellipsis', display: 'inline', width: '9em', textAlign: 'center'}} variant ='h6'>Top Song:</Typography>
                <br></br>
                <CardMedia
                      height='100'
                      component="img"
                      image={user.topTrack ? user.topTrack.image.url: 'https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999'}
                      alt=''
                      sx={{borderRadius: '10%' ,display: 'inline', width: '6em', objectFit: 'cover'}}
                      />     
                    <br></br>       
                <Typography sx={{textOverflow: 'ellipsis', display: 'inline', width: '8em', textAlign: 'center'}}  variant ='h6'>{user.topTrack? user.topTrack.name: ''}</Typography>      
                </div>
                <div style={{paddingLeft: '1px', display: 'inline', textAlign: 'center'}}>
                <Typography sx={{textOverflow: 'ellipsis', display: 'inline', width: '8em'}} variant ='h6'>Top Artist:</Typography>
                <br></br>  
                <CardMedia
                      height='100'
                      component="img"
                      image={user.topArtist? user.topArtist.image.url: 'https://rateds4superwoman.files.wordpress.com/2014/07/woman-question-mark.jpg'}
                      alt=''
                      sx={{borderRadius: '10%' , display: 'inline', width: '6em', objectFit: 'cover'}}
                      />   
                       <br></br>           
                <Typography display='inline' sx={{textOverflow: 'ellipsis', display: 'inline', width: '40%'}} variant ='h6'>{user.topArtist? user.topArtist.name: ''}</Typography>      
                </div>
                </div>     
                </CardContent>   
                </CardActionArea>
            </Card>
            </div>
        ))}
        </Container>
    </div>
)
            }
export default Discover;

//     return (<>
//         <div className="content-container">
//             <div className="row">
//                 <div className="left-panel box">
//                     {users.map((user) => (
//                         <div onClick = {() => setIdProfile(user.userId)}>
//                         <Card sx={{m: 2}} style={{backgroundColor: "grey", opacity: 0.9, boxShadow: "0 8px 10px rgba(0,0,0,0.3)",
//     "&:hover": {
//       boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"}, padding: '5px', borderRadius: '2%'}}>
//                             <CardActionArea component={Link} to="/discover/publicprofile" state={{id: user.userId}}>
//                                 <Typography variant="h5" color='black' textAlign='center' style={{fontWeight: "bold"}}>{user.name}</Typography>
//                             <CardContent style={{padding: '5px'}}>
//                                 <Typography style={{width: "200px", float: "left"}}color='grey' variant='h6'> Favorite Song:<br></br> {user.song}</Typography>
//                                 <Typography color='grey' variant='h6'> Favorite Artist: {user.artist} </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button  fullWidth ='true' variant='text' size='small'>
//                                         <Typography color ='black' variant='h7'>
//                                             View Profile
//                                         </Typography>
//                                 </Button>
//                                 </CardActions>
//                                 </CardActionArea>
                           
                                
//                         </Card>
//                     </div>)
//                     )}
//                 </div>
//             </div>
//         </div>
//     </>);
// }
