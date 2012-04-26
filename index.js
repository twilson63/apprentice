var pin = require('linchpin'), 
  url = require('url'),
  http = require('http'),
  https = require('https'),
  qs = require('qs');

var parseBody = function(req) {
  // exit if already parsed.
  if (req._params) return;
  req.params = null;

  contentType = req.headers['content-type'];
  // flag as parsed
  req._params = true;
  if (contentType === 'application/json') {
    try {
      req.params = JSON.parse(req.body);
    } catch (err) {
      pin.emit 'LOG-ERROR', { type: 'ERROR', msg: err.message, date: (new Date()).toString()}
    }
  } else if (contentType === 'application/xml') {
    // TODO: convert xml to params
  } else if (contentType === 'application/x-www-form-urlencoded') {
    try {
      req.params = qs.parse(req.params)
    } catch (err) {
      pin.emit 'LOG-ERROR', { type: 'ERROR', msg: err.message, date: (new Date()).toString()}
    }
  }
}

var setResource = function(path, req) {
  var pathItems = path.split('/');
  req.resource = ""; req.resourceId = "";
  if (pathItems.length > 1) { req.resource = pathItems[1]; }
  if (pathItems.length > 2) { req.resourceId = pathItems[2]; }

}

function Apprentice() {
  var self = this;

  self.httpServer = http.createServer();

  self.httpServer.on('request', function(req, res) {
    var path = url.parse(req.url).pathname, route = req.method;
    setResource(path, req);
    if (path.length > 1) route += url.parse(req.url).pathname;
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