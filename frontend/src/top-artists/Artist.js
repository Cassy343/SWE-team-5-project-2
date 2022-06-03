import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Artist = (props) => {
    return (<Card variant="elevation" 
            sx={{m: 1.8}}
            onClick={props.onClick}           
            style={{
                display: 'inline-block',
                width: '325px', 
                height: '325px',  
                padding: '8px', 
                backgroundColor: "SlateGrey", 
                boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
                backgroundColor: props.green ? 'rgb(30,215,96)' : "SlateGrey",
                cursor: props.clickable ? 'pointer' : 'auto',
                "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            }}}
        >
        <CardContent>
            <CardMedia
                component="img"
                height='240'
                width='200'
                image={props.artist.images[1].url}
                alt='Artist Picture Not Found'
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
                style={{
                    fontWeight: 'bold'
                }}
            >
                {props.artist.name}
            </Typography>
            <Typography variant ='h6'>
                Followers: {props.artist.followers.total}
            </Typography>     
        </CardContent>   
    </Card>);
};

export default Artist;