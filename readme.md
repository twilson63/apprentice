# Apprentice

Hey Web Frameworks!  

![http://blog.riskmanagers.us/wp-content/uploads/2010/11/donaldtrumpyourefired.jpg](http://blog.riskmanagers.us/wp-content/uploads/2010/11/donaldtrumpyourefired.jpg)

## YOU'RE FIRED!

The Apprentice makes it simple to get started creating an html and/or json web application in no time, with as little sugar as possible.

# Install

``` sh
npm install apprentice
```

## Dependencies

* linchpin

``` sh
npm install linchpin
```

# Usage 

``` javascript
var app = require('apprentice'),
  pin = require('linchpin');

pin.on('GET', function(req, res) { res.text('Come in to the Board Room'); });
pin.on('POST/lose', function(req, res) { res.text('You\'re fired!'); });
pin.on('PUT/win', function(req, res) { res.text('You\'re hired!'); });
pin.on('DELETE/110%', function(req, res) { res.text('Thats Great!'); });

app.httpServer.listen(3000);
```

# Features

## Response Macros

* text (body, status=200)

res.text is a shortcut to send a plain text response body back to the caller.

``` javascript
pin.on('GET', function(req, res) {res.text 'hello world');});
```

* json (body, status=200)

res.json is a shortcut to send a json document to the caller.

``` javascript
pin.on('GET', function(req, res) {res.json {foo: 'bar'});});
```

* html (body, status=200)

res.html is a shortcut to send a html document to the caller.

``` javascript
pin.on('GET', function(req, res) {res.html "<h1>Hello World</h1>");});
```

## FAQ

### How do I manage static assets

You can use filed:

``` javascript
pin.on('GET/favicon.ico', function(req, res) { filed("#{__dirname}/../assets/favicon.ico").pipe(res); });
pin.on 'GET/assets/*/*', function(req, res) { filed("#{__dirname}/../#{req.url}").pipe(res); });
```

