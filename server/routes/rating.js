exports.getRating = (app) => {
    app.get('/getRating/:trackID', async (req, res) => {
        try {
            let request = require('request');
            let crudOptions = {
                uri: '/read/rating/' + req.params.trackID,
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
            let request = require('request');
            let crudOptions = {
                uri: '/create/rating',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
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