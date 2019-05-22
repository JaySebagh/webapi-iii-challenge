const express = require('express');

const userdb = require('../helpers/userDb.js');

const router = express.Router();

function caps(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

// The R in CRUD
// returns all the users
router.get('/', (req, res) => {
    userdb
    .get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ success: false, message: "The user information could not be retrieved." })
    })
})

// returns the user based off the id in the URL
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    userdb.getById(userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." });
        });
})

// returns the user post based off the id in the URL
router.get('/post/:id', (req, res) => {
    const userId = req.params.id;
    userdb.getUserPosts(userId)
        .then(user => {
                res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user post information could not be retrieved." });
        });
})

// The C in CRUD
// adds a new user requiring user_id and text
router.post('/', caps,(req, res) => {
    const user = req.body;
    userdb
    .insert(user)
    .then(users => {
            res.status(201).json({ success: true, users });
    })
    .catch(message => {
        res.status(500).json({ success: false, message: "There was an error while saving the user to the database"  });
    });
});

// The D in CRUD
// deletes user. Generally use status 204 for delete, in this case I'm using 200 to return a message.
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    userdb
    .remove(userId)
    .then(deleted => {
            res.status(200).json({ success: true, message: 'you deleted!'});
    })
    .catch(({ code, message }) => {
        res.status(code).json({ success: false, message: "The users could not be removed" });
    });
});

// The U in CRUD
// update user
router.put('/:id', caps, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    userdb
    .update(id, changes)
    .then(updated => {
            res.status(200).json({ success: true, updated });
    })
    .catch (({ code, message }) => {
        res.status(code).json({ success: false, message });
    });
});

module.exports = router;