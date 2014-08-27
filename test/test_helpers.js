var Hapi = require('hapi');
var Fs = require('fs');
var Path = require('path');
var Crypto = require('crypto');

var internals = {};

exports.createTestServer = function (options, handler) {

    if (arguments.length === 1) {
        handler = options;
        options = {};
    }

    options = options || {};

    options.host = options.host || '127.0.0.1';
    options.port = options.port || 0;

    var server = Hapi.createServer(options.host, options.port);

    server.route({
        path: '/',
        method: 'POST',
        handler: handler
    });

    return server;
};

exports.uniqueFilename = function (path) {

    var name = [Date.now(), process.pid, Crypto.randomBytes(8).toString('hex')].join('-') + '.__test';
    return Path.join(path, name);
};