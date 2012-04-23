var router = new require('routes').Router();

var routeRequest = function(req, res) {
  var route = router.match(req.url);
  if (route != null) {
    route.fn.call(this, req, res, route.params, route.splats);
  } else {
    res.writeHead(404, { 'content-type': 'text/plain'});
    res.end('Not Found');
  }
};

var parseJSON = function(req) {
  if (req.headers['content-type'] === 'application/json') {
    req.json = JSON.parse(req.body);
  }
}

module.exports = function(server) {
  server.on('request', function(req, res) {
    req.body = "";
    // Get body if post or put
    if (req.method.match(/(PUT|POST)/) !== null) {
      req.on('data', function(data) { req.body += data; });
      req.on('end', function() { parseJSON(req); routeRequest(req, res); });
    } else {
      routeRequest(req, res);
    }
  });
  return router;
};
