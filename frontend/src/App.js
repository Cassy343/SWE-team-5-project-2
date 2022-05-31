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

function App() {
    return (<BrowserRouter
        className='App'
    >
        <Routes>
            <Route
                path='/' // goes to login page
                element={<Login />}
            />
            <Route
                path='/'
                element={<Nav />}
            >
                <Route
                    path='/profile'
                    element={<Profile />}
                />
                <Route
                    path='/discover'
                    element={<Discover />}
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
                    path='/dms'
                    element={<Dms />}
                />
            </Route>
        </Routes>
    </BrowserRouter>);
}

export default App;
