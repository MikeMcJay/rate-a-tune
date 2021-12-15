const { ObjectId } = require('mongodb');
let mongoose = require('mongoose');
// async function acquirePackagePromise(fileLocation, encoding) {
//     // Return a promise of whether the package file could be read or not
//     return fs.promises.readFile(fileLocation, encoding);
// }

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
                uri: 'http://' + 'localhost:3000' + '/read/rating/' + (trackID),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
            // Needs to calculate the mean rating before sending back
            request(crudOptions, function (error, response) {
                res.json(response.body);
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
                uri: 'http://' + 'localhost:3000' + '/create/rating',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                json: {
                    _id: (trackID),
                    tune: {
                        _id: (req.params.uid),
                        user: {
                            rating: 5
                        },
                    },
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