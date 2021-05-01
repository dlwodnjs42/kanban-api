import express from 'express';
import Column from '../dbSchema/dbColumn.mjs';

const columnRouter = express.Router();

//Middle ware that is specific to this router
columnRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// get
columnRouter.get('/', (req, res) => {
    Column.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

// post
columnRouter.post('/', (req, res) => {
    const dbColumns = req.body
    Column.create(dbColumns, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

export default columnRouter;
