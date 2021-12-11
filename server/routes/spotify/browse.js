exports.browseSong = (app) => {
    app.get('/browse/:searchValue', async (req, res) => {
        try {
            // Make a call to Spotify to retrieve data about spotify songs
            let request = require('request');
            let clientServerOptions = {
                uri: 'https://api.spotify.com/v1/search?q=' + req.params.searchValue + '&' + 'type=track' + '&' + 'market=US'
                    + '&' + 'limit=15',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer BQBrs9l89WPje73k0oyZk61TS_oBk5Pb-CNyfv3FvO7JRYzr8v5iUoFbVxYfM91jsap-2Brk6hge9LO4lqpphwNMYeQV3znaqxPr3C4nWQa10qlNfdi6tlfD9snoNkrSoei9jKhj3z-7YTxkyd1Orq9Otf5oHcMwfYk'
                }
            }
            request(clientServerOptions, function (error, response) {
                res.json(response.body);
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });
}