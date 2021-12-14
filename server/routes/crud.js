function schemaToUse(schema) {
    switch (schema) {
        case "Example":
            let { Example } = require('../models/example');
            return Example;
        case "Rating":
            let { Rating } = require('../models/ratings');
            return Rating;
    }
}

exports.read = (app) => {
    app.post('/read', async (req, res) => {
        let schema = schemaToUse(JSON.parse(req.body).schema);
        const read = await schema.find();
        try {
            res.json(read);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.create = (app) => {
    app.post('/create', async (req, res) => {
        const create = new Example(req.body);
        try {
            await create.save();
            res.send(create);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.update = (app) => {
    app.patch('/update/:id', async (req, res) => {
        try {
            await Example.findByIdAndUpdate(
                { _id: req.params.id }, req.body);
            // console.log('Values updated');
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.delete = (app) => {
    app.delete('/delete/:id', async (req, res) => {
        try {
            const del = await Example.findByIdAndDelete({ _id: req.params.id });
            if (!del) res.status(404).send('No item found');
        } catch (error) {
            res.status(500).send(error);
        }
    });
}