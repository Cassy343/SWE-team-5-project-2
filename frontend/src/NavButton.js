import { Box } from '@mui/material';

function NavButton(props) {
    return (
        <Box
            sx={{
                backgroundColor: props.selected ? '#efefef' : '#ffffff'
            }}
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