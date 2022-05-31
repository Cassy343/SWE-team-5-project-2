import { Box } from '@mui/material';

function NavButton(props) {
    return (
        <Box
            sx={{ height: 40 }}
            className='nav-button'
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
        >
            {props.children}
        </Box>
    );
}

export default NavButton;