import express from 'express';
import mongoose from 'mongoose';
import Dashboard from '../dbSchema/dbDashboard.mjs';

const dashboardRouter = express.Router();

//Middle ware that is specific to this dashboardRouter
dashboardRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


//TODO POPULATE ON EACH LEVEL
//TODO update but assuming the upper level exists.


// get
dashboardRouter.get('/', (req, res) => {
    Dashboard.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

dashboardRouter.get('/:id', (req, res) => {
    Dashboard.find({_id: req.params.id})
        .populate('users')
        .populate({
            path:'columns',
            populate:{
                path:'posts',
                populate:[{
                    path:'assigned_to',
                    select: {"first_name":1, "last_name":2}
                }, {
                    path: 'reporter',
                    select: {"first_name":1, "last_name":2}
                }, {
                    path: 'column',
                    select: {"column_title":1}
                }
            ]}})
        .exec((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})
;

dashboardRouter.patch('/:id', (req, res) => {
    // TODO: Validation

    const dashboard = Dashboard.findById(req.params.id).exec()
    if (!dashboard) return res.status(404).send("The dashboard with the given ID was not found")

    let query = { $set: {} };

    for (let key in req.body) {
        if (dashboard.key !== undefined && dashboard[key] !== req.body[key])
            //ignore the id and check which keys exist that we need to update
            console.log(key)
            query.$set[key] = req.body[key];
    }

    const updatedDashboard = Dashboard.findOneAndUpdate({ _id: req.params.id }, query)

    res.send(dashboard)
})

// delete

dashboardRouter.delete('/:id', (req, res) => {
    // TODO: Validation
    Dashboard.delete(dbDashboard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// post
dashboardRouter.post('/', (req, res) => {
    const dbDashboard = req.body

    Dashboard.create(dbDashboard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

export default dashboardRouter;
