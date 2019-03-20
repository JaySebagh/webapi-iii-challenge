const express = require('express');

const userdb = require('../helpers/userDb.js');

const router = express.Router();

// The R in CRUD
// returns all the users
router.get('/', (req, res) => {
    userdb
    .get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ success: false, message: "The post information could not be retrieved." })
    })
})

module.exports = router;