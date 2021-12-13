async function getToken() {
    let client_id = 'bb3cb5d065014eb2bc5fd52ecf009be5';
    let client_secret = 'b673f4d37a374421b00b4a27941638dc';

    try {
        let request = require('request-promise');
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            method: 'POST',
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        return await request(authOptions);
    } catch (error) {
        return error;
    }
}
module.exports.getToken = getToken;