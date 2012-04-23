# Apprentice

Hey Web Frameworks!  

![http://yourfired.jpg.to](http://yourfired.jpg.to)

## YOUR FIRED!

The Apprentice makes it simple to get started creating an html and/or json web application in no time, with as little sugar as possible.

# Install

``` sh
npm install apprentice
```

# Usage 

``` javascript
var http = require('http'),
  server = http.createServer(),
  router = new require('apprentice')(server);

router.addRoute('/', function(req, res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('Hello World');
});

router.addRoute('/widgets', function(req, res) {
  if(req.method == 'POST') {
    console.dir(req.json);
  }
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('Thank You!');
});

server.listen(3000);
```