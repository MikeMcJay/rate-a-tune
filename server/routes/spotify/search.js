let { getToken } = require('./token');

exports.getSong = (app) => {
    app.get('/getSong/:trackID', async (req, res) => {
        try {
            let token = getToken();
            token.then(result => {
                // Make a call to Spotify to retrieve data about spotify songs
                let request = require('request');
                let clientServerOptions = {
                    uri: 'https://api.spotify.com/v1/tracks/' + req.params.trackID,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + result.access_token
                    }
                }
                request(clientServerOptions, function (error, response) {
                    res.json(response.body);
                });
            });
        } catch (error) {
            res.send(error);
        }
    });
}

exports.browseSong = (app) => {
    app.get('/browse/:searchValue', async (req, res) => {
        try {
            let token = getToken();
            token.then(result => {
                // Make a call to Spotify to retrieve data about spotify songs
                let request = require('request');
                let clientServerOptions = {
                    uri: 'https://api.spotify.com/v1/search?q=' + req.params.searchValue + '&' + 'type=track' + '&' + 'market=US'
                        + '&' + 'limit=15',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + result.access_token
                    }
                }
                request(clientServerOptions, function (error, response) {
                    res.json(response.body);
                });
            });
        } catch (error) {
            res.send(error);
        }
    });
}