const mongoose = require('mongoose');

// An example database schema to use for testing the CRUD routes
const exampleSchema = new mongoose.Schema({
    username: String,
    name: String
}, { collection : 'test' });

module.exports.Example = mongoose.model('test', exampleSchema);