import express from 'express';
import User from '../dbSchema/dbUser.mjs';


const userRouter = express.Router();

//Middle ware that is specific to this userRouter
userRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


// get
userRouter.get('/', (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});
userRouter.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});


//post
userRouter.post('/', (req, res) => {
    const dbUser = req.body
    User.create(dbUser, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })

});

export default userRouter;
