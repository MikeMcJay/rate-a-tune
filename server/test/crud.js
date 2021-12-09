const fs = require('fs');

const app = require('../app');

let assert = require('assert');
describe('CRUD', function () {
    describe('# Retrieving JSON Package', function () {
        it("should return the server's json package", async function() {
            app.acquirePackageFile('package.json', 'utf8').then((testJSONPackage) => {
                const packageFile = fs.promises.readFile('package.json', 'utf8');
                packageFile.then((jsonPackage) => {
                    assert.equal(jsonPackage, testJSONPackage);
                });
            });
        });
    });

    describe('# Connecting to MongoDB', function () {
        it('should attempt to connect without error', async function() {
            app.connectToMongo().then(() => {
                done();
            }).catch((error) => {
                done(error);
            });
        });
    })

});