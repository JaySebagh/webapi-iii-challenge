// import express
const express = require('express');

const postsRouter = require('./data/posts/posts-router.js');
const usersRouter = require('./data/users/users-router.js')

// create new http server
const server = express();


server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

// routes
server.get('/', (req, res) => {
    res.send('BEEP BOOP SERVER STATUS: ALIVE');
});

module.exports = server; // exporting the server