const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');
// async function acquirePackagePromise(fileLocation, encoding) {
//     // Return a promise of whether the package file could be read or not
//     return fs.promises.readFile(fileLocation, encoding);
// }

exports.getUser = (app) => {
    app.post('/getUser/:trackID/:uid', async (req, res) => {
        // Ensure that the trackID being used as an ID is 24 hex characters
        let trackID;
        if (req.params.trackID.length !== 24) {
            trackID = req.params.trackID + '0'.repeat(24 - req.params.trackID.length);
        }
        try {
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/readArray/tune/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                json: { 'user._id': req.params.uid, 'tune._id' : trackID }
            }
            request(crudOptions, function (error, response) {
                res.json(response.body);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.getRating = (app) => {
    app.get('/getRating/:trackID', async (req, res) => {
        // Ensure that the trackID being used as an ID is 24 hex characters
        let trackID;
        if (req.params.trackID.length !== 24) {
            trackID = req.params.trackID + '0'.repeat(24 - req.params.trackID.length);
        }
        try {
            let request = require('request');
            let crudOptions = {
                uri: 'http://' + 'localhost:3000' + '/read/tune/' + (trackID),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
            // Needs to calculate the mean rating before sending back
            request(crudOptions, function (error, response) {
                if (!JSON.parse(response.body.toString())) {
                    res.json(null);
                } else {
                    let users = JSON.parse(response.body.toString()).user;
                    let rating = 0;
                    for(let i = 0, l = users.length; i < l; i++) {
                        rating += users[i].rating;
                    }
                    res.json({'rating': rating / users.length});
                }
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.addRating = (app) => {
    app.post('/addRating/:trackID/:uid', async (req, res) => {
        try {
            // Ensure that the trackID being used as an ID is 24 hex characters
            let trackID;
            if (req.params.trackID.length !== 24) {
                trackID = req.params.trackID + '0'.repeat(24 - req.params.trackID.length);
            }
            let request = require('request');
            let crudOptions = {
                // uri: 'http://' + JSON.parse(packageData).serverIPAddress + ':' + JSON.parse(packageData).serverPort +
                //     '/create/rating',
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
                        rating: 5,
                        review: 'It sounds good'
                    }],
                }
            }
            // If there are no ratings about this song
            request(crudOptions, function (error, response) {
                res.json(response.body);
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.insertRating = (app) => {
    app.patch('/insertRating/:trackID/:uid', async (req, res) => {
        try {
            // Ensure that the trackID being used as an ID is 24 hex characters
            let trackID;
            if (req.params.trackID.length !== 24) {
                trackID = req.params.trackID + '0'.repeat(24 - req.params.trackID.length);
            }
            let request = require('request');
            let crudOptions = {
                // uri: 'http://' + JSON.parse(packageData).serverIPAddress + ':' + JSON.parse(packageData).serverPort +
                //     '/create/rating',
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
                            rating: 4,
                            review: 'It sounds good'
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
    app.delete('/deleteRating/:trackID', async (req, res) => {
        try {
            // Ensure that the trackID being used as an ID is 24 hex characters
            let trackID;
            if (req.params.trackID.length !== 24) {
                trackID = req.params.trackID + '0'.repeat(24 - req.params.trackID.length);
            }
            let request = require('request');
            let crudOptions = {
                // uri: 'http://' + JSON.parse(packageData).serverIPAddress + ':' + JSON.parse(packageData).serverPort +
                //     '/create/rating',
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