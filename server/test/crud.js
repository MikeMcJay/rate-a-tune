const fs = require('fs');

const serverConfig = require('../app');
const express = require('express');
const request = require('supertest');
const app = express();

const index = require('../routes/crud');

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

        beforeEach(function () {
            // Connect to the mongo database
            serverConfig.connectToMongo();
        })

        afterEach(function() {
            // Disconnect from the mongo database
            serverConfig.disconnect();
        })

        describe('# Creates a new item', function () {
            it("should call on the /create route without generating error", function() {
                // Create the backend create route
                index.create(app);
                // See if content can be posted to the url
                request(app)
                    .post('/create/example')
                    .send({"username": "testUsername", "name": "testName"})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then(() => {
                        done();
                    }).catch(error => done(error));
            });
        });

        describe('# Finds an item', function () {
            it("should call on the /read route without generating error", function() {
                // Create the backend read route
                index.read(app);
                // See if content can be posted to the url
                request(app)
                    .post('/read/example')
                    .send({})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        done(response);
                    }).catch(error => done(error));
            });
        });

        describe('# Deletes an item', function () {
            it("should call on the /delete route without generating error", function() {
                // Create the backend update route
                index.delete(app);
                // See if content can be posted to the url
                request(app)
                    // Pass no id through
                    .delete('/delete/example')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        done(response);
                    }).catch(error => done(error));
            });
        });

        describe('# Updates an item', function () {
            it("should call on the /update route without generating error", function() {
                // Create the backend delete route
                index.update(app);
                // See if content can be posted to the url
                request(app)
                    // Pass a schema but no id
                    .patch('/update/example')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        done(response);
                    }).catch(error => done(error));
            });
        });
    });
});