import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Song = (props) => {
    return (
        <Card
            variant="elevation"
            sx={{m: 1.8}}
            onClick={props.onClick}
            style={{
                width: '325px',
                height: '325px',
                float: 'left',
                padding: '10px',
                backgroundColor: props.green ? 'rgb(30,215,96)' : "SlateGrey",
                cursor: props.clickable ? 'pointer' : 'auto',
                boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
                "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                }
            }}
        >
            <CardContent>
                <CardMedia
                    component="img"
                    height='240'
                    width='200'
                    image={props.song.album.images[1].url}
                    alt='Album Cover Not Found'
                />
                <Typography 
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical'
                    }}
                    display='inline'
                    variant='h5'
                    style={{ fontWeight: 'bold' }}
                >
                    {props.song.name}
                </Typography>
                <Typography variant ='h6'>
                    {props.song.album.artists[0].name}
                </Typography>     
            </CardContent>   
        </Card>
    );
};

export default Song;