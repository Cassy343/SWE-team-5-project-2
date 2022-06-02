import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Discover from './discover/Discover';
import Login from './login/Login';
import Profile from './profile/Profile';
import LikedSongs from './liked-songs/LikedSongs';
import TopSongs from './top-songs/TopSongs';
import TopArtists from './top-artists/TopArtists';
import Forums from './forums/Forums';
import Dms from './dms/Dms';
import Nav from './Nav';
import Posts from './forums/Posts';
import PublicProfile from './discover/PublicProfile'
import { useEffect, useReducer, useState } from 'react';
import { getProfileStaticContext, ProfileContext } from './Context';

const profileReducer = (profile, action) => {
    switch (action.type) {
        case 'set-token': {
            console.log(action.payload.token);
            const newProfile = { ...profile, spotifyToken: action.payload.token };
            if (newProfile.spotifyToken) {
                getProfileStaticContext(newProfile.spotifyToken)
                    .then(info => action.payload.updateProfile(info));
            }
            return newProfile;
        }
        case 'update-profile':
            return { ...profile, ...action.payload };
        default:
            return profile;
    }
};

function App() {
    // window.localStorage.getItem("token")
    const [profile, dispatch] = useReducer(profileReducer, {});

    const updateProfile = info => dispatch({ type: 'update-profile', payload: info });
    const setToken = token => {
        dispatch({
            type: 'set-token',
            payload: { token: token, updateProfile: updateProfile }
        });
    };

    useEffect(() => {
        setToken(window.localStorage.getItem('token'));
    }, []);

    return (<ProfileContext.Provider value={profile}>
        <BrowserRouter
            className='App'
        >
            <Routes>
                <Route
                    path='/' // goes to login page
                    element={<Login setSpotifyToken={setToken} />}
                />
                <Route
                    path='/'
                    element={<Nav setSpotifyToken={setToken} />}
                >
                    <Route
                        path='/profile'
                        element={profile.spotifyToken && <Profile spotifyToken={profile.spotifyToken} />}
                    />
                    <Route
                        path='/discover'
                        element={<Discover />}
                    />
                        <Route
                        path='/discover/publicprofile' 
                        element = {<PublicProfile/>}         
                        />  
                    <Route
                        path='/liked-songs'
                        element={<LikedSongs />}
                    />
                    <Route
                        path='/top-songs'
                        element={<TopSongs />}
                    />
                    <Route
                        path='/top-artists'
                        element={<TopArtists />}
                    />
                    <Route
                        path='/forums'
                        element={<Forums />}
                    />
                        <Route
                            path='/forums/posts'
                            element={<Posts />}
                        />
                    <Route
                        path='/dms'
                        element={<Dms />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </ProfileContext.Provider>);
}

export default App;
