const fs = require('fs');

const app = require('../app');

let assert = require('assert');
describe('CRUD', function () {

    let packageData;

    beforeEach(function() {
        let packagePromise = fs.promises.readFile('package.json', 'utf8');
        packagePromise.then((jsonPackage) => {
            packageData = jsonPackage;
        });
    });

    describe('# Retrieving JSON Package', function () {
        it("should return the server's json package", async function() {
            app.acquirePackagePromise('package.json', 'utf8').then((testPackageData) => {
                assert.equal(packageData, testPackageData);
            });
        });
    });

    describe('# Connecting to MongoDB', function () {
        it('should attempt to connect without error', async function() {
            app.connectToMongo().then((testPackagePromise) => {
                testPackagePromise.then((testPackageData) => {
                    assert.equal(packageData, testPackageData);
                });
            });
        });
    })

});