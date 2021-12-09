const express = require('express');
let { Example } = require('../models/example');

// module.exports = function crud(app) {
exports.read = (app) => {
        app.get('/read', async (req, res) => {
            const read = await Example.find();
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
            console.log('Values updated');
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
// }