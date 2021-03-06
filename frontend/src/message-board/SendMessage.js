import { Box, TextField } from "@mui/material";
import { useRef } from "react";

const handleSend = (event, contentRef, props) => {
    if (event.keyCode !== 13) {
        return;
    }

    const content = contentRef.current.value.trim();

    if (!content) {
        return;
    }

    props.sendMessage(content)
        .then(msg => props.addMessage(msg));

    contentRef.current.value = '';
};

// put message in database and return message body
const SendMessage = (props) => {
    const contentRef = useRef();

    return (<Box id='send-message-container'>
        <TextField
            inputRef={contentRef}
            onKeyDown={event => handleSend(event, contentRef, props)}
            placeholder='Type + press enter to add a post'
            sx={{ width: '100%' }}
        />
    </Box>)
};

export default SendMessage;