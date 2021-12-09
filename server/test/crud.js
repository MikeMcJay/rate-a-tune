const app = require('../app');

let assert = require('assert');
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

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
});