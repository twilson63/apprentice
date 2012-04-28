var mime = require(__dirname + '/mime'),
  log = require(__dirname + '/log')
  pin = require('linchpin'),
  qs = require('qs');

module.exports = function(req) {
  var parse = function(parser, req) {
    try {
      req.params = parser.parse(req.body);
      req._params = true;
    } catch (err) { log('ERROR', err.message); }  
  }

  if (req._params) return;
  req.params = null;
  contentType = req.headers['content-type'];
  if (contentType === mime.json) {
    parse(JSON, req);
  } else if (contentType === mime.json) {
    log('INFO', 'NOT IMPLEMENTED')
  } else if (contentType === mime.form) {
    parse(qs, req);
  }
  log('INFO', req.params)
}