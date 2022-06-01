import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

// props contains fetchAllMessages(), sendMessage(), editMessage()
function MessageBoard(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        props.fetchAllMessages()
            .then(msgs => {
                setMessages(msgs.data)
            });
    }, []);

    const addMessage = (msg) => setMessages([...messages, msg]);

    const deleteMessage = (id) => {
        setMessages(messages.filter(msg => msg.id !== id));
        props.deleteMessage(id);
    };

    const updateContent = (id, newContent) => {
        props.editMessage(id, newContent);
        const newMessages = [...messages];
        newMessages.forEach(msg => msg.content = msg.id == id ? newContent : msg.content);
        setMessages(newMessages);
    };

    return (<Box id='message-board-container'>
        <Stack
            direction='column'
            alignItems='center'
            justifyContent='flex-start'
            width='100%'
            spacing={1}
        >
            {messages.map(msg => <Message
                key={msg.id}
                user={props.user}
                msg={msg}
                updateContent={content => updateContent(msg.id, content)}
                delete={() => deleteMessage(msg.id)}
            />)}
            <SendMessage
                user={props.user}
                addMessage={addMessage}
                sendMessage={props.sendMessage}
            />
        </Stack>
    </Box>);
}

export default MessageBoard;