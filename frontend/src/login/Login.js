import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../Context";

const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const REDIRECT_URI = 'http://localhost:3000';

function Login(props) {
    // const [searchKey, setSearchKey] = useState("")
    // const [artists, setArtists] = useState([])

    // const logout = () => {
    //     setToken("")
    //     window.localStorage.removeItem("token")
    // }

    const profileContext = useContext(ProfileContext);

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        props.setSpotifyToken(token);
    }, [window.location]);

    // const searchArtists = async (e) => {
    //     e.preventDefault()
    //     const {data} = await axios.get("https://api.spotify.com/v1/search", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //         params: {
    //             q: searchKey,
    //             type: "artist"
    //         }
    //     })

    //     setArtists(data.artists.items)
    // }

    // const renderArtists = () => {
    //     return artists.map(artist => (
    //         <div key={artist.id}>
    //             {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
    //             {artist.name}
    //         </div>
    //     ))
    // }

    if (profileContext.spotifyToken) {
        window.location.replace(`${REDIRECT_URI}/profile`);
        return (<></>);
    }

    return (
        <>
            <Button
                onClick={() => {
                    window.location.replace(
                        `${AUTH_ENDPOINT}`
                        + `?client_id=${process.env.REACT_APP_spotifyClientId}`
                        + `&redirect_uri=${REDIRECT_URI}`
                        + `&response_type=${RESPONSE_TYPE}`
                        + `&scope=user-top-read`
                    );
                }}
            >
                Login with Spotify
            </Button>
        </>
        // <div className="App">
        //     <header className="App-header">
        //         <h1>Spotify React</h1>
        //         {!token ?
        //             <a href={}>Login
        //                 to Spotify</a>
        //             : <button onClick={logout}>Logout</button>}

        //         {token ?
        //             <form onSubmit={searchArtists}>
        //                 <input type="text" onChange={e => setSearchKey(e.target.value)}/>
        //                 <button type={"submit"}>Search</button>
        //             </form>

        //             : <h2>Please login</h2>
        //         }

        //         {renderArtists()}

        //     </header>
        // </div>
    );
}

export default Login;