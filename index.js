var router = new require('routes').Router();

var routeRequest = function(req, res) {
  var route;
  route = router.match(req.url);
  if (route != null) {
    return route.fn.call(this, req, res, route.params, route.splats);
  } else {
    res.writeHead(404, {
      'content-type': 'text/plain'
    });
    return res.end('request not found');
  }
};

module.exports = function(server) {
  server.on('request', function(req, res) {
    if (req.method === 'POST' || req.method === 'PUT') {
      req.body = "";
      req.on('data', function(data) {
        return req.body += data;
      });
      return req.on('end', function() {
        if (req.headers['content-type'] === 'application/json') {
          req.json = JSON.parse(req.body);
        }
        return routeRequest(req, res);
      });
    } else {
      return routeRequest(req, res);
    }
  });
  return router;
};
