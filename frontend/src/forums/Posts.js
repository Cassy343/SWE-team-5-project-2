import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import MessageBoard from "../message-board/MessageBoard";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {ProfileContext} from '../Context'


function Posts(props) {
    const [messages, setMessages] = useState(null);
    const [author, setAuthor] = useState("");
    const profile = useContext(ProfileContext);
    const [currentAuthor, setCurrentAuthor] = useState();
    const [change, setChange] = useState(0);

    const location = useLocation();
    const forumName = location.state?.name;
    const url = "http://localhost:8000/forums/messages?name=" + forumName + '&spotifyToken=' + profile.spotifyToken

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((text) => {
            const newMessages = text.result.map(m => {
                return {
                    id: m.id,
                    author: m.data.author,
                    content: m.data.content,
                    timeSent: m.data.timeSent,
                    upvotes: m.data.upvotes
                };
            })
            .sort(sortByDate);
            setMessages(newMessages);
            console.log(newMessages);
        })
        .catch((err) => console.log(err))

        axios.get(`/profile?spotifyToken=${profile.spotifyToken}`)
            .then(res => {setCurrentAuthor(res.data.id)})
    }, [change])

    const getUserName = (ref) => {
        axios.get(`/profile/name?firestoreId=${ref}&spotifyToken=${profile.spotifyToken}`)
            .then(res => {setAuthor(res.data.name)})
    }
    const sortByDate = (messageA, messageB) => {
        return messageA.timeSent < messageB.timeSent
            ? -1
            : (messageA.timeSent > messageB.timeSent ? 1 : 0);
    };

    const upvote = (index) => {
        axios.put(url + '&id=' + messages[index].id, {
            content: messages[index].data.content,
            author: messages[index].data.author,
            timeSent: messages[index].data.timeSent,
            upvotes: messages[index].data.upvotes
        })
        .then((res) => {setMessages([...messages, res.data])})
        .catch((err) => console.log(err))
    }
    const deleteMessage = (id) => {
        // empty return for now
    }
    const editMessage = (x, y) => {
        // empty return for now
    }

    const sendMessage = async (content) => {
        setChange(change + 1); 
        const currentTime = new Date()
        const res = await axios.post(url, {
            content: content,
            author: currentAuthor,
            timeSent: currentTime,
            upvotes: 0
        })
        return {
            author: {
                name: profile.name,
                id: profile.id
            },
            content: content,
            timeSent: currentTime,
            id: res.data.id
        };
        
    }

    return (<div style={{alignItems: 'center'}}>
        <h1 style={{textAlign: 'center', color:"rgb(30,215,96)"}}>{forumName}</h1>
        {messages && <MessageBoard
            messages={messages}
            deleteMessage={deleteMessage}
            editMessage={editMessage}
            sendMessage={sendMessage}
            getUserName={getUserName}
            author={author}
        ></MessageBoard>}
    </div>);
}

export default Posts;