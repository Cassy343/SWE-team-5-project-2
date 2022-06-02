import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { ProfileContext } from "../Context";
import MessageBoard from "../message-board/MessageBoard";

const sortByDate = (messageA, messageB) => {
    return messageA.timeSent < messageB.timeSent
        ? -1
        : (messageA.timeSent > messageB.timeSent ? 1 : 0);
};

function Dms(props) {
    const [dms, setDms] = useState({});
    const [channel, setChannelRaw] = useState(null);
    const profile = useContext(ProfileContext);

    const setChannel = id => {
        axios.get(`profile/dms-to?firestoreId=${id}&selfFirestoreId=${profile.id}`).then(outgoing => {
            const msgs = [...(dms[id] ? dms[id] : []), ...outgoing.data.map(msg => {
                return {
                    ...msg,
                    author: { ...profile }
                };
            })]
            .sort(sortByDate);

            setChannelRaw({
                id: id,
                messages: msgs
            });
        });
    };

    useEffect(() => {
        axios.get(`profile/dms?firestoreId=${profile.id}&spotifyToken=${profile.spotifyToken}`).then(res => {
            const newDms = {};
            res.data.forEach(msg => {
                if (!newDms[msg.author.id]) {
                    newDms[msg.author.id] = [];
                }

                newDms[msg.author.id].push(msg);
            });
            setDms(newDms);
        });
    }, []);

    // console.log(channel);

    return (<>
        {
            channel
            ? <MessageBoard
                messages={channel.messages}
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
            : <Button
                onClick={() => setChannel('vSddlkOyb82o9otUdo3q')}
            >
                Load
            </Button>
        }
    </>);
}

export default Dms;