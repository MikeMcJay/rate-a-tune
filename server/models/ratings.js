const mongoose = require('mongoose');

// This defines a subdocument schema to access user ratings/reviews of songs
// ratings > tuneID > userID
// reviews > tuneID > userID

const ratingSchema = new mongoose.Schema({
    tune: new mongoose.Schema({
        user: new mongoose.Schema({
            rating: Number
        }),
        _id: String
    }),
    _id: String
}, { collection : 'rating' });

module.exports.Rating = mongoose.model('rating', ratingSchema);