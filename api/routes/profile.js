const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const { db } = require('../db');
require('dotenv').config();
const { getDocs, doc, query, collection, where, updateDoc, getDoc, addDoc } = require('firebase/firestore');

const BASE_URL = 'https://api.spotify.com/v1';

const displayNameCache = {};
const tokenToSpotifyId = {};
const spotifyIdToFirestoreId = {};
const firestoreIdToSpotifyId = {};

function sortByDate(messageA, messageB) {
    return messageA.timeSent < messageB.timeSent
        ? -1
        : (messageA.timeSent > messageB.timeSent ? 1 : 0);
}

const getSpotifyProfileFromToken = async token => {
    if (tokenToSpotifyId[token] && displayNameCache[tokenToSpotifyId[token]]) {
        const id = tokenToSpotifyId[token];

        return {
            name: displayNameCache[id],
            spotifyId: id
        };
    } else {
        const res = await axios.get(`${BASE_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const id = res.data.id;
        displayNameCache[id] = res.data.display_name;
        tokenToSpotifyId[token] = id;

        return {
            name: res.data.display_name,
            spotifyId: id
        };
    }
};

const getSpotifyProfileFromId = async (token, id) => {
    if (displayNameCache[id]) {
        return {
            name: displayNameCache[id],
            spotifyId: id
        };
    } else {
        const res = await axios.get(`${BASE_URL}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        displayNameCache[id] = res.data.display_name;

        return {
            name: res.data.display_name,
            spotifyId: id
        };
    }
};

const getFirestoreProfileFromSpotifyId = async id => {

    if (spotifyIdToFirestoreId[id]) {
        return await getDoc(doc(db, 'users', spotifyIdToFirestoreId[id]));
    } else {
        const profileQuery = query(
            collection(db, 'users'),
            where('spotifyId', '==', id)
        );
           
        const docs = await getDocs(profileQuery);
        const dc = docs.docs[0];
        spotifyIdToFirestoreId[id] = dc.id;
        firestoreIdToSpotifyId[dc.id] = id;
        return dc;
    }
};

const getFirestoreIdFromQuery = async reqQuery => {
    if (reqQuery.firestoreId) {
        return reqQuery.firestoreId;
    }

    let spotifyId;
    if (reqQuery.spotifyId) {
        spotifyId = reqQuery.spotifyId;
    } else {
        if (tokenToSpotifyId[reqQuery.spotifyToken]) {
            spotifyId = tokenToSpotifyId[reqQuery.spotifyToken];
        } else {
            spotifyId = (await getSpotifyProfileFromToken(reqQuery.spotifyToken)).spotifyId;
        }
    }

    if (spotifyIdToFirestoreId[spotifyId]) {
        return spotifyIdToFirestoreId[spotifyId];
    } else {
        return (await getFirestoreProfileFromSpotifyId(spotifyId)).id;
    }
};

const getSpotifyIdFromFirestoreId = async firestoreId => {
    if (firestoreIdToSpotifyId[firestoreId]) {
        return firestoreIdToSpotifyId[firestoreId];
    } else {
        const id = (await getDoc(doc(db, 'users', firestoreId))).data().spotifyId;
        firestoreIdToSpotifyId[firestoreId] = id;
        spotifyIdToFirestoreId[id] = firestoreId;
        return id;
    }
};

router.get('/', (req, res) => {
    const getSpotifyProfile = async () => {
        if (req.query.spotifyId) {
            return await getSpotifyProfileFromId(req.query.spotifyToken, req.query.spotifyId);
        } else {
            return await getSpotifyProfileFromToken(req.query.spotifyToken);
        }
    };

    getSpotifyProfile().then(info => {
        getFirestoreProfileFromSpotifyId(info.spotifyId).then(dc => {
            res.send({
                ...dc.data(),
                name: info.name,
                id: dc.id
            });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

router.get('/name', (req, res) => {
    const getName = async () => {
        const spotifyId = await getSpotifyIdFromFirestoreId(req.query.firestoreId);
        const profile = await getSpotifyProfileFromId(req.query.spotifyToken, spotifyId);
        return profile;
    };

    getName().then(info => {
        res.send(info);
    })
    .catch(e => console.log(e));
});

router.get('/public', (req, res) => {
    const pubQuery = query(
        collection(db, 'users'),
        where('private', '==', false)
    );

    getDocs(pubQuery).then(docs => {
        Promise.all(
            docs.docs.map(async dc => {
                const data = dc.data();
                const spotifyProfile = (await axios.get(`${BASE_URL}/users/${data.spotifyId}`, {
                    headers: {
                        'Authorization': `Bearer ${req.query.spotifyToken}`
                    }
                })).data;

                const topTrack = data.profileSongs && data.profileSongs[0]
                ? (await axios.get(`${BASE_URL}/tracks/${data.profileSongs[0]}`, {
                    headers: {
                        'Authorization': `Bearer ${req.query.spotifyToken}`
                    }
                })).data.album
                : null;
                const topArtist = data.profileArtists && data.profileArtists[0]
                ? (await axios.get(`${BASE_URL}/artists/${data.profileArtists[0]}`, {
                    headers: {
                        'Authorization': `Bearer ${req.query.spotifyToken}`
                    }
                })).data
                : null;

                return {
                    ...data,
                    name: spotifyProfile.display_name,
                    id: dc.id,
                    pfp: spotifyProfile.images[0],
                    topTrack: topTrack ? {
                        image: topTrack.images[0],
                        name: topTrack.name
                    } : null,
                    topArtist: topArtist ? {
                        image: topArtist.images[0],
                        name: topArtist.name
                    } : null
                };
            })
        )
        .then(users => res.send(users))
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

router.get('/display-info', (req, res) => {
    const token = req.query.spotifyToken;
    const firestoreId = req.query.firestoreId;

    const fetchInfo = async () => {
        // const dc = getDoc(doc())
    };
});

router.get('/top-songs', (req, res) => {
    axios.get(`${BASE_URL}/me/top/tracks${req.query.timeRange ? `?time_range=${req.query.timeRange}` : ''}`, {
        headers: {
            'Authorization': `Bearer ${req.query.spotifyToken}`
        }
    })
    .then(spotifyRes => {
        res.send(spotifyRes.data.items);
    })
    .catch(e => console.log(e));
});

router.get('/top-artists', (req, res) => {
    axios.get(`${BASE_URL}/me/top/artists${req.query.timeRange ? `?time_range=${req.query.timeRange}` : ''}`, {
        headers: {
            'Authorization': `Bearer ${req.query.spotifyToken}`
        }
    })
    .then(spotifyRes => {
        res.send(spotifyRes.data.items);
    })
    .catch(e => console.log(e));
});

router.get('/liked-songs', (req, res) => {
    axios.get(`${BASE_URL}/me/tracks`, {
        headers: {
            'Authorization': `Bearer ${req.query.spotifyToken}`
        }
    })
    .then(spotifyRes => {
        res.send(spotifyRes.data.items);
    })
    .catch(e => console.log(e));
});

router.put('/', (req, res) => {
    updateDoc(doc(db, 'users', req.query.firestoreId), req.body);
});

router.get('/dms', (req, res) => {
    getFirestoreIdFromQuery(req.query).then(firestoreId => {
        getDocs(collection(db, 'users', firestoreId, 'dms')).then(docs => {
            Promise.all(docs.docs.map(async dc => {
                const data = dc.data();
                const authorSpotifyId = await getSpotifyIdFromFirestoreId(data.author.id);
                console.log(data.author.id, authorSpotifyId);
                const authorSpotify = await getSpotifyProfileFromId(req.query.spotifyToken, authorSpotifyId);
                const ret = {
                    ...data,
                    id: dc.id,
                    timeSent: new Date(data.timeSent),
                    author: {
                        name: authorSpotify.name,
                        id: data.author.id
                    }
                };
                return ret;
            }))
            .then(dms => res.send(dms.sort(sortByDate)));
        });
    })
    .catch(e => console.log(e));
});

router.get('/dms-to', (req, res) => {
    const lookupDm = async () => {
        const recipientFirestoreId = await getFirestoreIdFromQuery(req.query);
        const authorFirestoreId = req.query.selfFirestoreId;
        const dmQuery = query(
            collection(db, 'users', recipientFirestoreId, 'dms'),
            where('author', '==', doc(db, 'users', authorFirestoreId))
        );
        return (await getDocs(dmQuery)).docs;
    };

    lookupDm().then(docs => res.send(docs.map(dc => { return { ...dc.data(), id: dc.id }; })))
        .catch(e => console.log(e));
});

router.post('/dms', (req, res) => {
    const addDm = async () => {
        const recipientFirestoreId = await getFirestoreIdFromQuery(req.query);
        const authorFirestoreId = await getFirestoreIdFromQuery(req.body.author);
        return await addDoc(collection(db, 'users', recipientFirestoreId, 'dms'), {
            author: doc(db, 'users', authorFirestoreId),
            content: req.body.content,
            timeSent: req.body.timeSent
        });
    };

    addDm()
        .then(dc => res.send({ id: dc.id }))
        .catch(e => console.log(e));
});

module.exports = router;
