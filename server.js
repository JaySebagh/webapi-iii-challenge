// import express
const express = require('express');

const postsRouter = require('./data/posts/posts-router.js');
const usersRouter = require('./data/users/users-router.js')

// create new http server
const server = express();

// middleware
server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

// exporting the server
module.exports = server;