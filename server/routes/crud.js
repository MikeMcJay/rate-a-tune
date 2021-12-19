function schemaToUse(schema) {
    let { Tune } = require('../models/ratings');
    let { Example } = require('../models/example');
    switch (schema) {
        case "example":
            return Example;
        case "tune":
            return Tune;
    }
}

exports.read = (app) => {
    app.post('/read/:schema/', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        const read = await schema.find(req.body);
        try {
            res.json(read);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.create = (app) => {
    app.post('/create/:schema', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        const create = new schema(req.body);
        try {
            await create.save();
            res.send(create);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.update = (app) => {
    app.patch('/update/:schema/:id', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        try {
            await schema.findByIdAndUpdate(
                { _id: req.params.id }, req.body);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.updateArray = (app) => {
    app.patch('/updateArray/:schema/', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        const update = await schema.update(req.body.where, req.body.set);
        try {
            res.json(update);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.delete = (app) => {
    app.delete('/delete/:schema/:id', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        try {
            const del = await schema.findByIdAndDelete({ _id: req.params.id });
            if (!del) res.status(404).send('No item found');
        } catch (error) {
            res.status(500).send(error);
        }
    });
}