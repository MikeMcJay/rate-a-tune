const mongoose = require('mongoose');

// This defines a document/sub-document schema to access user ratings/reviews of songs
// tune (collection) > exampleSong (document) > user (document) > rating/review (fields)

const userSchema = new mongoose.Schema({
    _id: String,
    rating: Number,
    // review: String
});

const tuneSchema = new mongoose.Schema({
    _id: String,
    user: [userSchema]
}, { collection : 'tune' });

module.exports.Tune = mongoose.model('tune', tuneSchema);