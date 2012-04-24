var pin = require('linchpin');

pin.on('*', function(req, res) {
  console.log(JSON.stringify({ 
    url: req.url, 
    method: req.method, 
    date: (new Date()).toString() 
  }));
});

