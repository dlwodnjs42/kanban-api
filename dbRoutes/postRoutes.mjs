import express from 'express';
import mongoose from 'mongoose';

import Post from '../dbSchema/dbPost.mjs';
import Column from '../dbSchema/dbColumn.mjs';

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
    const query = { $set: {} };
    Post.findOne({_id:req.params.id}).exec((err, post) => {
        if (err) return res.status(500).send(err)
        Column.findOneAndUpdate({ _id: post.column }, { $pull: { posts: post._id }}).exec()

        for (let key in req.body) {
            if (key === 'columns' || key === "reporter" || key === "assigned_to") {
                query.$set[key] = mongoose.Types.ObjectId(req.body[key])
            }
            else if (post[key] !== req.body[key]) {
                query.$set[key] = req.body[key];
            }
        }
        Promise.all([
            Post.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, query).exec(),
            Column.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.column) }, { $push: { posts: mongoose.Types.ObjectId(req.params.id) } }).exec(),
        ]).catch(err => {
            console.error("something went wrong")
            return res.status(500).send("Something went wrong.")
        })
    })



})

postRouter.delete('/:id', (req, res) => {
    const post_id = mongoose.Types.ObjectId(req.params.id);

    Post.findOne({ _id: post_id }).exec((err, data) => {
        if (!err) {
            Column.findOneAndUpdate({ _id: data.column }, { $pull: { posts: post_id }}).exec((err, data)=> {})
            Post.findOneAndRemove({ _id: post_id }).exec((err,data)=> {})
            return res.status(200).send("Success")
        } else {

            console.error("something went wrong")
            return res.status(500).send("Something went wrong.")
        }
    })

})

//post
postRouter.post('/', (req, res) => {
    const dbPost = req.body

    if (dbPost.reporter) {
        const reporter = mongoose.Types.ObjectId(dbPost.reporter)
        dbPost['reporter'] = reporter
    } else {
        delete dbPost['reporter']
    }

    if (dbPost.assigned_to) {
        const assigned_to = mongoose.Types.ObjectId(dbPost.assigned_to)
        dbPost['assigned_to'] = assigned_to
    } else {
        delete dbPost['assigned_to']
    }
    const column_uid = mongoose.Types.ObjectId(dbPost.column)
    dbPost['column'] = column_uid
    dbPost['story_points'] = parseInt(dbPost.story_points) || 0

    const new_post_id = mongoose.Types.ObjectId();
    dbPost['_id'] = new_post_id

    Promise.all([
        Post.create(dbPost),
        Column.updateOne({ _id: column_uid }, { $push: { posts: new_post_id } })
    ]).catch(err=> {
        console.log(dbPost)
        console.error("something went wrong")
    })

    return res.status(201).send("Success")

});




export default postRouter;
