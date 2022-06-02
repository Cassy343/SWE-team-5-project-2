import { TextField } from "@mui/material";
import { useRef } from "react";

function handleSubmit(event, contentRef, props) {
    if (event.keyCode === 27) {
        props.edit(null);
        return;
    }
    
    if (event.keyCode !== 13) {
        return;
    }

    const content = contentRef.current.value.trim();

    if (!content) {
        props.edit(null);
        return;
    }

    props.edit(contentRef.current.value);
}

function EditMessage(props) {
    const contentRef = useRef();

    return (<>
        <TextField
            inputRef={contentRef}
            defaultValue={props.content}
            onKeyDown={event => handleSubmit(event, contentRef, props)}
            sx={{ width: '100%' }}
        />
    </>)
}

export default EditMessage;