const app = require('../app');

let assert = require('assert');
describe('CRUD', function () {
    describe('# Retrieving JSON Package', function () {
        it("should return the server's json package", async function() {
            app.acquirePackageFile('package.json', 'utf8').then(() => {
                done();
            }).catch((error) => {
                done(error);
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