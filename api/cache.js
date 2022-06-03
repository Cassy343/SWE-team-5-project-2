const { default: axios } = require('axios');
const { db } = require('./db');
require('dotenv').config();
const { getDocs, doc, query, collection, where, getDoc } = require('firebase/firestore');

const BASE_URL = 'https://api.spotify.com/v1';

const displayNameCache = {};
const tokenToSpotifyId = {};
const spotifyIdToFirestoreId = {};
const firestoreIdToSpotifyId = {};

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

module.exports = {
    BASE_URL: BASE_URL,
    displayNameCache: displayNameCache,
    tokenToSpotifyId: tokenToSpotifyId,
    spotifyIdToFirestoreId: spotifyIdToFirestoreId,
    firestoreIdToSpotifyId: firestoreIdToSpotifyId,
    getSpotifyProfileFromToken: getSpotifyProfileFromToken,
    getSpotifyProfileFromId: getSpotifyProfileFromId,
    getFirestoreProfileFromSpotifyId: getFirestoreProfileFromSpotifyId,
    getFirestoreIdFromQuery: getFirestoreIdFromQuery,
    getSpotifyIdFromFirestoreId: getSpotifyIdFromFirestoreId
}