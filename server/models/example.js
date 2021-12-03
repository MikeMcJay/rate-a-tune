const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    username: String,
    name: String
});

module.exports.Example = mongoose.model('Example', exampleSchema);