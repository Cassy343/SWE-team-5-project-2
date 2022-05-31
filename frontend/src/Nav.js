import { Paper, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import NavButton from './NavButton';
import './Nav.css';

function Nav(props) {
    return (<>
        <Paper
            id='nav-bar'
        >
            <nav>
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='left'
                    id='nav-stack'
                >
                    <Link to="/profile" className='nav-link'>
                        <NavButton>Profile</NavButton>
                    </Link>
                    <Link to="/liked-songs" className='nav-link'>
                        <NavButton>Liked Songs</NavButton>
                    </Link>
                    <Link to="/top-songs" className='nav-link'>
                        <NavButton>Top Songs</NavButton>
                    </Link>
                    <Link to="/top-artists" className='nav-link'>
                        <NavButton>Top Artists</NavButton>
                    </Link>
                    <Link to="/dms" className='nav-link'>
                        <NavButton>DMs</NavButton>
                    </Link>
                    <Link to="/discover" className='nav-link'>
                        <NavButton>Discover</NavButton>
                    </Link>
                    <Link to="/forums" className='nav-link'>
                        <NavButton>Forums</NavButton>
                    </Link>
                </Stack>
            </nav>
        </Paper>
        <Outlet />
    </>);
}

export default Nav;