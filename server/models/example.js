const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    username: String,
    name: String
}, { collection : 'test' });

module.exports.Example = mongoose.model('test', exampleSchema);