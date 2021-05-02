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

columnRouter.get('/:id', (req, res) => {
    Column.findById(req.params.id)
        .populate('posts')
        .exec((err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })
});

columnRouter.patch('/:id', (req, res) => {
    // TODO: Validation

    const column = Column.findById(req.params.id).exec()
    if (!column) return res.status(404).send("The column with the given ID was not found")

    let query = { $set: {} };
    for (let key in req.body) {
        if (column[key] && column[key] !== req.body[key])
            //ignore the id and check which keys exist that we need to update
            query.$set[key] = req.body[key];
    }
    const updatedColumn = Column.findOneAndUpdate({ _id: req.params.id }, query)

    res.send(column)
})


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
