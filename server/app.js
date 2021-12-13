const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Cross Origin for passing data
app.use(cors({origin: true}));

const crud = require('./routes/index');
crud.update(app);
crud.read(app);
crud.create(app);
crud.delete(app);
const search = require('./routes/spotify/search');
search.browseSong(app);

function beginServer() {
    const packagePromise = acquirePackagePromise('./package.json', 'utf8');
    packagePromise.then((packageData) => {
        // If the server is already listening to the specified port ignore
        app.listen(JSON.parse(packageData).serverPort, () => console.log('Server is online at: ' +
            JSON.parse(packageData).serverIPAddress + ':' + JSON.parse(packageData).serverPort));
    }).catch(error => {
        console.log("**********");
        console.log('Error: ' + error);
        console.log("**********")
    });
}

async function acquirePackagePromise(fileLocation, encoding) {
    // Return a promise of whether the package file could be read or not
    return fs.promises.readFile(fileLocation, encoding);
}

function connectToMongo() {
    const packagePromise = acquirePackagePromise('./package.json', 'utf8');
    packagePromise.then((packageData) => {
        // Parse the JSON package file for server, extracting the name assigned to the mongo docker container, its
        // allocated port and the database we are trying to connect to
        const mongoDatabase = 'test';
        mongoose.connect('mongodb://' + JSON.parse(packageData).mongoDockerName + ':' + JSON.parse(packageData).mongoPort +
            '/' + mongoDatabase, { useNewUrlParser: true }, function (error) {
            let db = mongoose.connection;
            db.once('open', function() {
                console.log("**********");
                console.log('The server is connected to the mongo database');
                console.log("**********");
            });
            if (error) {
                console.log("**********");
                console.log('Error: ' + error);
                console.log("**********");
                return error;
            }
        });
    }).catch((error) => {
        return error;
    });
    return packagePromise;
}
beginServer();
connectToMongo().then().catch(() => {disconnectFromMongoose()});

function disconnectFromMongoose() {
    mongoose.connection.close();
}

module.exports.acquirePackagePromise = acquirePackagePromise;
module.exports.connectToMongo = connectToMongo;
module.exports.beginServer = beginServer;
module.exports.disconnect = disconnectFromMongoose;