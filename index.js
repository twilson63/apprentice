var pin = require('linchpin'), 
  url = require('url'),
  http = require('http'),
  https = require('https'),
  qs = require('qs');

var parseBody = function(req) {
  // exit if already parsed.
  if (req._params) return;

  contentType = req.headers['content-type'];
  // flag as parsed
  req._params = true;

  if (contentType === 'application/json') {
    req.params = JSON.parse(req.body);
  } else if (contentType === 'application/xml') {
    // TODO: convert xml to params
  } else if (contentType === 'application/x-www-form-urlencoded') {
    req.params = qs.parse(req.params)
  }
}

function Apprentice() {
  var self = this;

  self.httpServer = http.createServer();

  self.httpServer.on('request', function(req, res) {
    route = req.method + url.parse(req.url).pathname;
    req.body = "";
    req.on('data', function(data) { req.body += data; });
    req.on('end', function() { 
      if (req.body.length > 0) { parseBody(req); }
      pin.emit(route, req, res); 
    });
  });

  return self;
};

module.exports = Apprentice();