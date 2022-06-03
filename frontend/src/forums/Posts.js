import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import MessageBoard from "../message-board/MessageBoard";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {ProfileContext} from '../Context'


function Posts(props) {
    const [messages, setMessages] = useState([]);
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
            console.log(text);
            setMessages(text.result)
        })
        .catch((err) => console.log(err))

        axios.get(`/profile?spotifyToken=${profile.spotifyToken}`)
            .then(res => {setCurrentAuthor(res.data.id)})
      }, [])

    const getUserName = (ref) => {
        axios.get(`/profile/name?firestoreId=${ref}&spotifyToken=${profile.spotifyToken}`)
            .then(res => {setAuthor(res.data.name)})
    }
    const sortByDate = (messageA, messageB) => {
        return messageA.timeSent < messageB.timeSent
            ? -1
            : (messageA.timeSent > messageB.timeSent ? 1 : 0);
    };

    const flattenMessages = () => {
        const flattened = [];
        console.log(messages);
        messages.forEach(m => {
            flattened.push({
                id: m.id,
                author: m.data.author,
                content: m.data.content,
                timeSent: m.data.timeSent,
                upvotes: m.data.upvotes
            })
        })
        flattened.sort(sortByDate)
        console.log(flattened);
        return flattened;
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
    const deleteMessage = (id) => {
        // empty return for now
    }
    const editMessage = (x, y) => {
        // empty return for now
    }

    const sendMessage = (content) => {
        console.log(currentAuthor);
        axios.post(url, {
            content: content,
            author: currentAuthor,
            timeSent: new Date(),
            upvotes: 0
        })
        .then((res) => {return([res.data])})
        .catch((err) => console.log(err))
        setChange(change + 1)
    }
    return (<div style={{alignItems: 'center'}}>
        <h1 style={{textAlign: 'center', color:"rgb(30,215,96)"}}>{forumName}</h1>
        {<MessageBoard
            messages={flattenMessages()}
            deleteMessage={deleteMessage}
            editMessage={editMessage}
            sendMessage={sendMessage}
            getUserName={getUserName}
            author={author}
        ></MessageBoard>}
    </div>);
}

export default Posts;