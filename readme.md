# Apprentice

Hey Web Frameworks!  

![http://blog.riskmanagers.us/wp-content/uploads/2010/11/donaldtrumpyourefired.jpg](http://blog.riskmanagers.us/wp-content/uploads/2010/11/donaldtrumpyourefired.jpg)

## YOU'RE FIRED!

The Apprentice makes it simple to get started creating an html and/or json web application in no time, with as little sugar as possible.

# Install

``` sh
npm install apprentice
```

# Usage 

``` javascript
var app = require('apprentice'),
  pin = require('linchpin');

pin.on('GET/', function(req, res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('Hello World');
});

app.httpServer.listen(3000);
```