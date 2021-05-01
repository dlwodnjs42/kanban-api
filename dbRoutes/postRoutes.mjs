import express from 'express';
import Post from '../dbSchema/dbPost.mjs';

const postRouter = express.Router();

//Middle ware that is specific to this postRouter
postRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// get
postRouter.get('/', (req, res) => {
    Post.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

postRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

// postRouter.get('/:ids', (req, res) => {
//     Post.find({ "_id": { "$in": result[req.params.ids] } }, (err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(200).send(data)
//         }
//     })
// });

//post
postRouter.post('/', (req, res) => {
    const dbPost = req.body
    Post.create(dbPost, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })

});


export default postRouter;
