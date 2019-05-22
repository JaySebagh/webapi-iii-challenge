const express = require('express');

const postdb = require('../helpers/postDb.js');

const router = express.Router();

// The R in CRUD
// returns all the posts
router.get('/', (req, res) => {
    postdb
    .get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ success: false, message: "The post information could not be retrieved." })
    })
})

// returns the post based off the id in the URL
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    postdb.getById(postId)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
})

// The C in CRUD
// adds a new post requiring user_id and text
router.post('/', (req, res) => {
    const post = req.body;
    postdb
    .insert(post)
    .then(posts => {
            res.status(201).json({ success: true, posts });
    })
    .catch(message => {
        res.status(500).json({ success: false, message: "There was an error while saving the post to the database"  });
    });
});

// The D in CRUD
// deletes post. Generally use status 204 for delete, in this case I'm using 200 to return a message.
router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    postdb
    .remove(postId)
    .then(deleted => {
            res.status(200).json({ success: true, message: 'you deleted!'});
    })
    .catch(({ code, message }) => {
        res.status(code).json({ success: false, message: "The posts could not be removed" });
    });
});

// The U in CRUD
// update user post
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    postdb
    .update(id, changes)
    .then(updated => {
            res.status(200).json({ success: true, updated });
    })
    .catch (({ code, message }) => {
        res.status(code).json({ success: false, message });
    });
});

module.exports = router;