const mongoose = require('mongoose');

// This defines a subdocument schema to access user ratings of songs
// ratings > stars > tuneID > userID
// ratings > reviews > tuneID > userID

const ratingSchema = new mongoose.Schema({
    // For accessing song's star ratings
    stars: {
        // A schema for each individual tune
        tuneSchema: new mongoose.Schema({
            // _id (or trackID) is set in the server
            // A schema for each user rating the tune
            userRating: new mongoose.Schema({
                // _id (or the uid) is set in the server
                rating: Number
            })
        })
    },
    // For accessing each song's reviews
    reviews: {}
});
module.exports.Rating = mongoose.model('rating', ratingSchema);