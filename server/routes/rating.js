// exports.getRating = (app) => {
//     app.get('/getRating/:trackID', async (req, res) => {
//         try {
//             let token = getToken();
//             token.then(result => {
//                 // Make a call to Spotify to retrieve data about spotify songs
//                 let request = require('request');
//                 let clientServerOptions = {
//                     uri: 'https://api.spotify.com/v1/tracks/' + req.params.trackID,
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                         'Authorization': 'Bearer ' + result.access_token
//                     }
//                 }
//                 request(clientServerOptions, function (error, response) {
//                     res.json(response.body);
//                 });
//             });
//         } catch (error) {
//             res.send(error);
//         }
//     });
// }