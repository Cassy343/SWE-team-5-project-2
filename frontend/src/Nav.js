import { Box, Paper, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import NavButton from './NavButton';
import './Nav.css';
import { useState } from 'react';

function Nav(props) {
    const [selectedLink, setSelectedLink] = useState(0);

    const links = [
        {
            to: "/profile",
            label: "Profile"
        },
        {
            to: "/liked-songs",
            label: "Liked Songs"
        },
        {
            to: "/top-songs",
            label: "Top Songs"
        },
        {
            to: "/top-artists",
            label: "Top Artists"
        },
        {
            to: "/dms",
            label: "DMs"
        },
        {
            to: "/discover",
            label: "Discover"
        },
        {
            to: "/forums",
            label: "Forums"
        },
    ];

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
                    {
                        links.map((link, index) => <Box
                            key={link.to}
                            onClick={() => setSelectedLink(index)}
                        >
                            <Link
                                to={link.to}
                                className='nav-link'
                            >
                                <NavButton selected={index === selectedLink}>
                                    {link.label}
                                </NavButton>
                            </Link>
                        </Box>)
                    }
                </Stack>
            </nav>
        </Paper>
        <Outlet />
    </>);
}

export default Nav;