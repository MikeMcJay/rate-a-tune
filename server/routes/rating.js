const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');

function formatTrackID(trackID) {
    // Ensure that the trackID being used as an ID is 24 hex characters
    if (trackID.length !== 24) {
        return (trackID + '0'.repeat(24 - trackID.length));
    }
}

exports.getUser = (app) => {
    // Get user details about the tune they are currently viewing
    app.post('/getUser/:trackID/:uid', async (req, res) => {
        let trackID = formatTrackID(req.params.trackID);
        try {
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/read/tune',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                json: { 'user._id': req.params.uid, '_id' : trackID }
            }
            request(crudOptions, function (error, response) {
                res.json(response.body[0]);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.getRating = (app) => {
    // Get the average rating of the tune
    app.get('/getRating/:trackID', async (req, res) => {
        let trackID = formatTrackID(req.params.trackID);
        try {
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/read/tune',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                json: { '_id' : trackID }
            }
            // Needs to calculate the mean rating before sending back
            request(crudOptions, function (error, response) {
                // If the response array of size 0 is returned, no ratings are present
                if (response.body.length === 0) {
                    res.json(null);
                } else {
                    let user = response.body[0].user;
                    let rating = 0;
                    for(let i = 0, l = (user.length); i < l; i++) {
                        rating += user[i].rating;
                    }
                    res.json({'rating': rating / user.length});
                }
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.updateRating = (app) => {
    // Update the user's rating of the track
    app.patch('/updateRating/:trackID/:uid', async (req, res) => {
        try {
            let trackID = formatTrackID(req.params.trackID);
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/updateArray/tune',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                json: {
                    where: {
                        $and: [{
                            'user._id' : req.params.uid,
                            '_id': trackID
                        }],
                    },
                    set: {
                        $set: {
                            'user.$._id': req.params.uid,
                            'user.$.rating': req.body.userRating
                        }
                    }
                }
            }
            request(crudOptions, function (error, response) {
                res.send(response);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.addRating = (app) => {
    // Create a new instance of the tune schema, adding info about the first user to rate the track
    app.post('/addRating/:trackID/:uid', async (req, res) => {
        try {
            let trackID = formatTrackID(req.params.trackID);
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/create/tune',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                json: {
                    _id: (trackID),
                    user: [{
                        _id: (req.params.uid),
                        rating: req.body.userRating,
                        // review: 'It sounds good'
                    }],
                }
            }
            request(crudOptions, function (error, response) {
                res.json(response.body);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.insertRating = (app) => {
    // Push another user's rating of the track to an existing array containing all user ratings
    // of the given track
    app.patch('/insertRating/:trackID/:uid', async (req, res) => {
        try {
            let trackID = formatTrackID(req.params.trackID);
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/update/tune/' + (trackID),
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                json: {
                    $push: {
                        user: {
                            _id: (req.params.uid),
                            rating: req.body.userRating,
                            // review: 'It sounds good'
                        }
                    }
                }
            }
            request(crudOptions, function (error, response) {
                res.send(response);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.deleteRating = (app) => {
    // Delete the track using the trackID
    app.delete('/deleteRating/:trackID', async (req, res) => {
        try {
            let trackID = formatTrackID(req.params.trackID);
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/delete/tune/' + (trackID),
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            }
            request(crudOptions, function (error, response) {
                res.send(response);
            });
        } catch (error) {
            res.send(error);
        }
    });
}