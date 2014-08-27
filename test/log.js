var Lab = require('lab');
var Log = require('../lib/log');
var Stream = require('stream');

// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Lab.expect;
var before = lab.before;
var after = lab.after;
var describe = lab.describe;
var it = lab.it;

describe('Log', function () {

    describe('get', function () {

        it('reads a log file from the beginning', function (done) {
            
            var expectedResult = [{ event: 'request',
                                     timestamp: 1369328753222,
                                     id: '1369328753222-42369-62002',
                                     instance: 'http://localhost:8080',
                                     labels: [ 'api', 'http' ],
                                     method: 'get',
                                     path: '/test',
                                     query: {},
                                     source: { remoteAddress: '127.0.0.1' },
                                     responseTime: 9,
                                     statusCode: 200
                                  },
                                  { event: 'request',
                                     timestamp: 1469328953222,
                                     id: '1469328953222-42369-62002',
                                     instance: 'http://localhost:8080',
                                     labels: [ 'api', 'http' ],
                                     method: 'get',
                                     path: '/test2',
                                     query: {},
                                     source: { remoteAddress: '127.0.0.1' },
                                     responseTime: 19,
                                     statusCode: 200
                                  }];

            Log.get('test/fixtures/request.log', 0, function (bytesRead, result) {


                expect(bytesRead).to.eql(505);
                expect(result).to.eql(expectedResult);
                done();
            });
        });

        it('does not load a log file', function (done) {
 
            var trapConsole = console.error;
            Log.get('test/fixtures/nofile.log', 0, function (bytesRead, result) {

                console.error = trapConsole;
                expect(bytesRead).to.eql(0);
                expect(result).to.eql([]);
                done();
            });
            console.error = function(string) {

                expect(string).to.match(/ENOENT/);
            };
        });
    });

    it('reads to the end of valid JSON', function (done) {

        var expectedResult = [{ event: 'request',
            timestamp: 1369328753222,
            id: '1369328753222-42369-62002',
            instance: 'http://localhost:8080',
            labels: [ 'api', 'http' ],
            method: 'get',
            path: '/test',
            query: {},
            source: { remoteAddress: '127.0.0.1' },
            responseTime: 9,
            statusCode: 200
        }];

        Log.get('test/fixtures/incomplete.log', 0, function (bytesRead, result) {


            expect(bytesRead).to.eql(252);
            expect(result).to.eql(expectedResult);
            done();
        });
    });
});
