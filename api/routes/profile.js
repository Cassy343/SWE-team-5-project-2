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
        });
    });
});

router.get('/top-songs', (req, res) => {
    axios.get(`${BASE_URL}/me/top/tracks`, {
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
    axios.get(`${BASE_URL}/me/top/artists`, {
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
    updateDoc(doc(db, 'profile', req.query.firestoreId), req.body);
});

router.get('/dms', (req, res) => {
    getFirestoreIdFromQuery(req.query).then(firestoreId => {
        getDocs(collection(db, 'users', firestoreId, 'dms')).then(docs => {
            res.send(docs.docs.map(dc => {
                return { ...dc.data(), id: dc.id }
            }));
        });
    })
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
        .then(dc => res.send(dc))
        .catch(e => console.log(e));
});

module.exports = router;
