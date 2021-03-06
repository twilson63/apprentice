var pin = require('linchpin'), 
  url = require('url'),
  http = require('http'),
  filed = require('filed'),
  parseBody = require('./lib/parse'),
  setResource = require('./lib/resource'),
  mime = require('./lib/mime'),
  log = require('./lib/log');

// pin.on('GET/assets/**', function(req, res) {
//   var resource = req.url.replace(/assets/,'public');
//   filed('.' + resource).pipe(res);
// });

function Apprentice() {
  var self = this;

  self.httpServer = http.createServer();

  self.httpServer.on('request', function(req, res) {
    var path = url.parse(req.url).pathname;
    
    res.text = function(body, statusCode) {
      if (statusCode == null || statusCode == 'undefined') { statusCode = 200 };
      res.writeHead(statusCode, { 'content-type': mime.text });
      res.end(body);
    }
    
    res.json = function(body, statusCode) {
      if (statusCode == null || statusCode == 'undefined') { statusCode = 200 };
      try { 
        body = JSON.stringify(body);
        res.writeHead(statusCode, {'content-type': mime.json });
        res.end(body);
      } catch (err) { 
        log('ERROR', err.message); 
        res.writeHead(statusCode, {'content-type': mime.json });
        res.end(JSON.stringify({ error: 'BAD JSON: ' + err.message}));
      };
    }
    
    res.html = function(body, statusCode) {
      if (statusCode == null || statusCode == 'undefined') { statusCode = 200 };
      res.writeHead(statusCode, {'content-type': mime.html });
      res.end(body);
    }
    
    setResource(path, req);
    //if (path.length > 1) route += url.parse(req.url).pathname;
    req.body = "";
    if (req.headers['content-type'].match(/(application\/json|application\/x-www-form-urlencoded)/) !== null) {
      req.on('data', function(data) { req.body += data; });
      req.on('end', function() { 
        if (req.body.length > 0) { parseBody(req); }
        pin.emit('REQ' + req.url, req, res); 
      });
    } else {
      pin.emit('REQ' + req.url, req, res); 
    }
  });
  
  self.start = function(port, cb) {
    self.httpServer.listen(port, cb);
  }

  return self;
};

module.exports = Apprentice();