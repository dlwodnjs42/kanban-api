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
    Post.find()
        .populate('reporter')
        .populate('assigned_to')
        .exec((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

postRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('reporter')
        .populate('assigned_to')
        .exec((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

postRouter.patch('/:id', (req, res) => {
    // TODO: Validation

    const post = Post.findById(req.params.id).exec()
    if (!post) return res.status(404).send("The post with the given ID was not found")

    let query = { $set: {} };
    for (let key in req.body) {
        if (post[key] && post[key] !== req.body[key])
            //ignore the id and check which keys exist that we need to update
            query.$set[key] = req.body[key];
    }
    const updatedPost = Post.findOneAndUpdate({ _id: req.params.id }, query)

    res.send(post)
})

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
