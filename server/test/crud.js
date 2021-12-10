const fs = require('fs');

const serverConfig = require('../app');
const express = require('express');
const app = express();

const index = require('../routes/index');

let assert = require('assert');
describe('Database Testing', function () {
    describe('JSON Package Retrieval and Database Connection', function () {
        let packageData;

        beforeEach(function() {
            // Acquire the json package with information about the server location
            let packagePromise = fs.promises.readFile('package.json', 'utf8');
            packagePromise.then((jsonPackage) => {
                packageData = jsonPackage;
            });
        });

        describe('# Retrieving JSON Package', function () {
            it("should return the server's json package", async function() {
                serverConfig.acquirePackagePromise('package.json', 'utf8').then((testPackageData) => {
                    assert.equal(packageData, testPackageData);
                });
            });
        });

        describe('# Connecting to MongoDB', function () {
            it('should attempt to connect without error', async function() {
                serverConfig.connectToMongo().then((testPackagePromise) => {
                    testPackagePromise.then((testPackageData) => {
                        assert.equal(packageData, testPackageData);
                    });
                });
            });
        });

        after(function() {
            // Disconnect from the mongo database
            serverConfig.disconnect();
        });
    });

    describe('CRUD Functionality', function () {
        function addData(postData){
            let packagePromise = fs.promises.readFile('package.json', 'utf8');
            packagePromise.then((packageData) => {
                var request = require('request');
                let clientServerOptions = {
                    uri: 'http://'+ JSON.parse(packageData).serverIPAddress + ':' + JSON.parse(packageData).serverPort
                        + '/' + 'create',
                    body: JSON.stringify(postData),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                request(clientServerOptions, function (error, response) {
                    console.log(error,response.body);
                });
            });
        }

        describe('# Creates a new item', function () {
            it("should have a route that allows for new data creation", async function() {
                // Create the backend create route
                index.create(app);
                // Connect to the mongo database
                serverConfig.connect();
                // See if content can be posted to the url
                addData({"username": "testUsername", "name": "testName"});
            });
        });
    });
});