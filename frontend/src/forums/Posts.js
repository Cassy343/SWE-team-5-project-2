import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function Posts(props) {
    const [messages, setMessages] = useState([]);
    const [newContent, setNewContent] = useState("");

    const location = useLocation();
    const forumName = location.state?.name;
    const url = "http://localhost:8000/forums/messages?name=" + forumName

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((text) => setMessages(text.result))
        .catch((err) => console.log(err))
      }, [])

    const getUserInfo = () => {

    }

    const createMessage = () => {
        console.log(newContent)
        axios.post(url, {
            content: newContent,
            author: "unknown",
            timeSent: "unknown",
            upvotes: 4
        })
        .then((res) => {setMessages([...messages, res.data])})
        .catch((err) => console.log(err))
    }

    const upvote = (index) => {
        console.log(messages[index])
        axios.put(url + '&id=' + messages[index].id, {
            content: messages[index].data.content,
            author: messages[index].data.author,
            timeSent: messages[index].data.timeSent,
            upvotes: messages[index].data.upvotes
        })
        .then((res) => {setMessages([...messages, res.data])})
        .catch((err) => console.log(err))
    }

    return (<>
        <TextField
            id="standard-basic" 
            variant="standard"
            helperText = "Message Content"
            onChange={(e) => setNewContent(e.target.value)}
            inputProps={{ defaultValue: null }}
        />
        <Button 
            color='success'
            onClick={createMessage}>Post</Button>
        {messages.map((m, index) => 
        <Grid>
            <Grid item xs><p>{m.data.content}- m.data.author, {m.data.timeSent}, {m.data.upvotes} upvotes</p></Grid>
            {/*<Grid item xs><Button onClick={upvote(index)}>Upvote</Button></Grid>*/}
        </Grid>)}
    </>);
}

export default Posts;