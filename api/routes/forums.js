var express = require('express');
var router = express.Router();
require('dotenv').config();
const { db } = require('../db');
const {doc, addDoc, getDocs, collection, query, where, updateDoc} = require("firebase/firestore")
const { BASE_URL,
    getSpotifyProfileFromToken,
    getSpotifyProfileFromId,
    getFirestoreProfileFromSpotifyId,
    getFirestoreIdFromQuery,
    getSpotifyIdFromFirestoreId } = require('../cache.js');

const flattenMessageData = async (data, token) => {
    const authorFirestoreId = data.author.id;
    const authorSpotifyId = await getSpotifyIdFromFirestoreId(authorFirestoreId);
    const authorSpotify = await getSpotifyProfileFromId(token, authorSpotifyId);

    return {
        ...data,
        author: {
            id: authorFirestoreId,
            name: authorSpotify.name
        }
    };
};

router.get('/', async (req, res, next) => {
    const allDocs = [];
    const docs = await getDocs(collection(db, "forums"));
    docs.forEach((doc) => {allDocs.push(doc.data())})
    res.json({result: allDocs})
});

router.post('/', async (req, res, next) => {
    const forum = {
        name: req.body.name,
        imageLink: req.body.imageLink,
    };
    const forumDoc = await addDoc(collection(db, 'forums'), forum);
    res.send(forumDoc)
});

router.get('/messages', async (req, res, next) => {
    const q = query(
        collection(db, 'forums'), where('name', '==', req.query.name)
    );

    const d = await getDocs(q).then(docs => docs.docs);

    const docs = await getDocs(collection(db, 'forums', d[0].id, 'messages'));
    const allDocs = await Promise.all(docs.docs.map(async dc => {
        const data = await flattenMessageData(dc.data(), req.query.spotifyToken);
        return {
            id: dc.id,
            data: data
        };
    }));
    res.json({result: allDocs})
});

router.post('/messages', async (req, res, next) => {
    console.log(req.body.author)
    const message = {
        author: doc(db, 'users/' + req.body.author),
        content: req.body.content,
        timeSent: req.body.timeSent,
        upvotes: req.body.upvotes
    }
    const q = query(
        collection(db, 'forums'), where('name', '==', req.query.name)
    );
    const d = await getDocs(q).then(docs => docs.docs);

    const messageDoc = await addDoc(collection(db, 'forums', d[0].id, 'messages'), message);
    res.send(messageDoc)
})

router.put('/messages', async(req, res, next) => {
    const q = query(
        collection(db, 'forums'), where('name', '==', req.query.name)
    );
    const d = await getDocs(q).then(docs => docs.docs);

    const messageDoc = await updateDoc(doc(db, 'forums', d[0].id, 'messages', req.query.id), {
        author: req.body.author,
        content: req.body.content,
        timeSent: req.body.timeSent,
        upvotes: req.body.upvotes + 1
    });
    res.send(messageDoc)
});

module.exports = router;
