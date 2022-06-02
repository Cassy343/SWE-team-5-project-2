import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import { useContext, useState } from "react";
import EditMessage from "./EditMessage";
import { ProfileContext } from "../Context";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '0.3em',
    p: 4
};

function Actions(props) {
    return (<Box className='message-actions'>
        {
            props.isUsersMessage &&
            <IconButton
                size='small'
                onClick={() => props.setEditing(true)}
            >
                <EditOutlinedIcon />
            </IconButton>
        }
        <IconButton
            size='small'
        >
            <ReplyIcon />
        </IconButton>
        {
            props.isUsersMessage &&
            <IconButton
                size='small'
                onClick={() => props.setDeleting(true)}
            >
                <DeleteOutlineIcon color='error' />
            </IconButton>
        }
    </Box>)
}

function Message(props) {
    const msg = props.msg;
    const [hovering, setHovering] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const profile = useContext(ProfileContext);

    function editMessage(content) {
        setEditing(false);

        if (!content || content === props.msg.content) {
            return;
        }

        props.updateContent(content);
    }

    return (<Box
        className='message'
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
    >
        <Box className='message-header'>
            <Typography
                color='text.secondary'
                sx={{ fontWeight: 'bold' }}
            >{msg.author.name}</Typography>
            <Box width='0.5em' />
            <Typography
                color='text.secondary'
                sx={{ fontSize: '0.85em' }}
            >
                {new Date(msg.timeSent).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}
            </Typography>
            {
                (hovering && !editing) && <Actions
                    isUsersMessage={msg.author.id === profile.id}
                    setEditing={setEditing}
                    setDeleting={setDeleting}
                />
            }
        </Box>
        {
            editing
            ? <EditMessage
                content={msg.content}
                edit={content => editMessage(content)}
            />
            : <Typography className='message-text'>{msg.content}</Typography>
        }
        <Modal
            open={deleting}
            onClose={() => {
                setHovering(false);
                setDeleting(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography
                    variant='h4'
                >Are you sure you want to delete this message?</Typography>
                <Typography
                    color='text.secondary'
                    sx={{ fontSize: '1.5em' }}
                >Click outside the box to cancel.</Typography>
                <Button
                    color='error'
                    onClick={() => {
                        setDeleting(false);
                        props.delete();
                    }}
                    variant='contained'
                >Confirm</Button>
            </Box>
        </Modal>
    </Box>)
}

export default Message;