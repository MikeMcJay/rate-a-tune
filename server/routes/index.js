const express = require('express');
let { Example } = require('../models/example');

exports = module.exports = function(app) {
    // app.get('/hello', (req, res) => res.json({ username: 'MikeMcJay' }));
    app.get('/hello', async (req, res, next) => {
        const example = await Example.find();
        res.send(example);
        // res.render('index', { example: example })
    });
}