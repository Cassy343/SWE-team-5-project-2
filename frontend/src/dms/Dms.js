import { Box, Button, Card, Stack, Typography, Toolbar, Container, Divider } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import Helmet from "react-helmet";
import { ProfileContext } from "../Context";
import MessageBoard from "../message-board/MessageBoard";
import './dms.css';

const sortByDate = (messageA, messageB) => {
    return messageA.timeSent < messageB.timeSent
        ? -1
        : (messageA.timeSent > messageB.timeSent ? 1 : 0);
};

function Dms(props) {
    const [dms, setDms] = useState({});
    const [channel, setChannelRaw] = useState(null);
    const profile = useContext(ProfileContext);
    const [selectedDm, setSelectedDm] = useState(null);

    const setChannel = id => {
        axios.get(`profile/dms-to?firestoreId=${id}&selfFirestoreId=${profile.id}`).then(outgoing => {
            const msgs = [...(dms[id].msgs ? dms[id].msgs : []), ...outgoing.data.map(msg => {
                return {
                    ...msg,
                    author: { ...profile }
                };
            })]
            .sort(sortByDate);

            setSelectedDm(id);

            setChannelRaw({
                id: id,
                dms: {
                    author: dms[id].author,
                    msgs: msgs
                }
            });
        });
    };

    useEffect(() => {
        axios.get(`profile/dms?firestoreId=${profile.id}&spotifyToken=${profile.spotifyToken}`).then(res => {
            const newDms = {};
            res.data.forEach(msg => {
                if (!newDms[msg.author.id]) {
                    newDms[msg.author.id] = {
                        author: msg.author,
                        msgs: []
                    };
                }

                newDms[msg.author.id].msgs.push(msg);
            });
            setDms(newDms);
        });
    }, []);

    return (<>
    <Helmet><title>DMs</title></Helmet>
    <div>
        <Toolbar variant='dense' style={{minHeight: '80px' }}>
            <Container maxWidth='2000px' style={{ paddingLeft: '130px', display: "flex",}}>
            <Typography style={{paddingLeft: '100px', textAlign: "center", padding: '10px', fontWeight: 'bold', color: "rgb(30,215,96)", letterSpacing: '4px'}}variant='h4'>DMs</Typography>
            </Container>
        </Toolbar>
            <Divider></Divider>    
    <Box id='dms-container'>
        <Box id='channel-select-container'>
            <Card id='channel-select'>
                <Stack
                    direction='column'
                    spacing={1}
                    justifyContent='flex-start'
                    alignItems='flex-start'
                >
                    {
                        Object.values(dms).map(info => <Box
                            onClick={() => setChannel(info.author.id)}
                            className='dm-link'
                            sx={{
                                background: selectedDm === info.author.id ? '#efefef' : '#ffffff'
                            }}
                        >
                            <Typography variant='h5'>
                                {info.author.name}
                            </Typography>
                        </Box>)
                    }
                </Stack>
            </Card>
        </Box>
        {
            channel !== null && <MessageBoard
                messages={channel.dms.msgs}
                sendMessage={async content => {
                    const currentTime = new Date();

                    const res = await axios.post(`/profile/dms?firestoreId=${channel.id}`, {
                        author: {
                            spotifyToken: profile.spotifyToken
                        },
                        content: content,
                        timeSent: currentTime
                    });
                    
                    return {
                        author: {
                            name: profile.name,
                            id: profile.id
                        },
                        content: content,
                        timeSent: currentTime,
                        id: res.data.id
                    };
                }}
                editMessage={() => {}}
                deleteMessage={() => {}}
            />
        }
    </Box>
    </div>
    </>);
}

export default Dms;