function schemaToUse(schema) {
    switch (schema) {
        case "example":
            let { Example } = require('../models/example');
            return Example;
        case "rating":
            let { Rating } = require('../models/ratings');
            return Rating;
    }
}

exports.readAll = (app) => {
    app.get('/read/:schema', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        const read = await schema.find();
        try {
            res.json(read);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.readByID = (app) => {
    app.get('/read/:schema/:id', async (req, res) => {
        let schema = schemaToUse(req.params.schema);
        const read = await schema.findById(req.params.id);
        try {
            res.json(read);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

// exports.insert = (app) => {
//     app.post('/insert/:schema', async (req, res) => {
//         let schema = schemaToUse(req.params.schema);
//         const insert = new schema(req.body);
//         try {
//             await create.save();
//             res.send(create);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     });
// }

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