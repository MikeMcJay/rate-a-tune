const mongoose = require('mongoose');

// This defines a subdocument schema to access user ratings/reviews of songs
// ratings > tuneID > userID
// reviews > tuneID > userID

const userSchema = new mongoose.Schema({
    _id: String,
    rating: Number,
    review: String
});

const tuneSchema = new mongoose.Schema({
    _id: String,
    user: [userSchema]
}, { collection : 'tune' });

// const ratingSchema = new mongoose.Schema({
//     tune: new mongoose.Schema({
//         user: new mongoose.Schema({
//             rating: Number,
//             _id: String
//         }),
//         _id: String
//     })
// }, { collection : 'rating' });

module.exports.Tune = mongoose.model('tune', tuneSchema);