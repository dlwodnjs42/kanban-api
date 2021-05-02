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
    User.findById(req.params.id)
        .populate('dashboards')
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })
});

userRouter.get('/:email', (req, res) => {
    User.findOne({email: req.params.email})
        .populate('dashboards')
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })
});

// patch
userRouter.patch('/:id', (req, res) => {
    // TODO: Validation

    const user = User.findById(req.params.id).exec()
    if (!user) return res.status(404).send("The product with the given ID was not found")

    let query = {$set: {}};
    for (let key in req.body) {
        if (user[key] && user[key] !== req.body[key])
            //ignore the id and check which keys exist that we need to update
            query.$set[key] = req.body[key];
    }
    const updatedUser = User.findOneAndUpdate({_id: req.params.id}, query)

    res.send(user)
})

// post
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
