import express from 'express';
import Dashboard from '../dbSchema/dbDashboard.mjs';

const dashboardRouter = express.Router();

//Middle ware that is specific to this dashboardRouter
dashboardRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


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
    Dashboard.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

// posts
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
