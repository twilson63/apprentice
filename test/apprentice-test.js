var EventEmitter = require('events').EventEmitter,
    req = new EventEmitter(), res = {}, server = new EventEmitter(),
    assert = require('assert');

// Test
res.writeHead = function(status, msg) {
  assert.equal(status, 200);
}

res.end = function(foo) {
  assert.equal(foo, 'FOO BAR');
}

// setup
var router = require('../')(server);

router.addRoute('/', function(req, res) {
  res.writeHead(200, { 'content-type': 'text/plain'});
  res.end('FOO BAR');
});

// POST PLAIN Example
req.url = '/'
req.headers = {'content-type': 'text/plain'};
req.method = "POST"

// Invoke
server.emit('request', req, res);
req.emit('data', '{"FOO":"BAR"}');
req.emit('end');

// Setup
req = new EventEmitter()
req.url = '/'
req.headers = {'content-type': 'text/plain'};
req.method = "GET"

// Invoke
server.emit('request', req, res);

// PUT JSON Example
req = new EventEmitter()
req.url = '/'
req.headers = {'content-type': 'application/json'};
req.method = "PUT"
// Invoke
server.emit('request', req, res);
req.emit('data', '{"FOO":"BAR"}');
req.emit('end');

