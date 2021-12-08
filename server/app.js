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

require('./routes')(app);

async function acquirePackageFile() {
    // Return a promise of whether the package file could be read or not
    return fs.promises.readFile('./package.json', 'utf8');
}

function connectToMongo() {
    const packageFile = acquirePackageFile();
    packageFile.then((packageData) => {
        // Parse the JSON package file for server, extracting the name assigned to the mongo docker container, its
        // allocated port and the database we are trying to connect to
        const mongoDatabase = 'test';
        mongoose.connect('mongodb://' + JSON.parse(packageData).mongoDockerName + ':' + JSON.parse(packageData).mongoPort +
            '/' + mongoDatabase, { useNewUrlParser: true });

        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error connecting the server to the mongo database.'));
        db.once('open', function() {
            console.log("**********");
            console.log('The server is connected to the mongo database: ' + mongoDatabase);
            console.log("**********");
        });

        app.listen(JSON.parse(packageData).serverPort, () => console.log('Server is online at: ' +
            JSON.parse(packageData).serverIPAddress + ':' + JSON.parse(packageData).serverPort));

    }).catch((error) => {
        console.log("**********");
        console.log('Error: ' + error);
        console.log("**********");
    });
}
connectToMongo();