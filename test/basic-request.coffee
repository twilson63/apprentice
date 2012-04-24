app = require('../')
request = require('request')
pin = require('linchpin')

describe 'apprentice', ->
  describe 'GET /', ->
    it 'should be successful', (done) ->
      pin.on 'request/*', (req, res) ->
        console.log 'foo'
        req.writeHead 200, 'content-type': 'text/plain'
        req.end 'Hello World'

      app.httpServer.listen 3000

      request 'http://localhost:3000', (err, res, body) -> console.log body
      done()