const mongoose = require('mongoose');

// This defines a subdocument schema to access user ratings of songs
// ratings > stars > tuneID > userID
// ratings > reviews > tuneID > userID

const ratingSchema = new mongoose.Schema({
    // This single subdocument contains the star ratings for every song
    stars: {
        // Contains an array of all tunes
        tunes: [{
            // Contains an array of all user ratings for that tune
            user: [{
                // The rating the user gave that tune
                rating: Number
            }]
        }],
    },
    // This single subdocument contains the reviews for every song
    reviews: {}
});
module.exports.Rating = mongoose.model('rating', ratingSchema);