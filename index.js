var pin = require('linchpin'), 
  url = require('url'),
  http = require('http'),
  https = require('https');

var parseJSON = function(req) {
  if (req.headers['content-type'] === 'application/json') {
    req.json = JSON.parse(req.body);
  }
}

function Apprentice() {
  var self = this;

  self.httpServer = http.createServer();

  self.httpServer.on('request', function(req, res) {
    route = req.method + url.parse(req.url).pathname;
    req.body = "";
    // Get body if post or put
    if (req.method.match(/(PUT|POST)/) !== null) {
      req.on('data', function(data) { req.body += data; });
      req.on('end', function() { parseJSON(req); pin.emit(route, req, res); });
    } else {
      pin.emit(route, req, res);
    }
  });

  return self;
};

module.exports = Apprentice();