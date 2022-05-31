const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const { db } = require('../db');
require('dotenv').config();
const { getDocs, doc, query, collection, where } = require('firebase/firestore');

const BASE_URL = 'https://api.spotify.com/v1';

router.get('/', (req, res) => {
    axios.get(`${BASE_URL}/me`, {
        headers: {
            'Authorization': `Bearer ${req.query.spotifyToken}`
        }
    })
    .then(res2 => {
        const spotifyId = res2.data.id;
        const profileQuery = query(
            collection(db, 'users'),
            where('spotifyId', '==', spotifyId)
        );
        getDocs(profileQuery).then(docs => {
            const profileDoc = docs.docs[0];
            res.send({
                ...profileDoc.data(),
                id: profileDoc.id
            });
        });
    });
});

module.exports = router;
