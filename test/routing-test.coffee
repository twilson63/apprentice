request = require 'request'
assert = require 'assert'
apprentice = require '../'
mime = require '../lib/mime'
pin = require 'linchpin'

pin.on 'GET', (req, res) -> res.text 'hello world'
pin.on 'POST', (req, res) -> res.text 'foo=' + req.params.foo, 201
pin.on 'PUT', (req, res) -> res.text 'foo=' + req.params.foo
pin.on 'DELETE', (req, res) -> res.text 'delete me'

#pin.on 'LOG', (entry) -> console.log entry

counter = 0

# apprentice.httpServer.on 'request', (req, res) ->
#   req.connection.setTimeout = 20000

apprentice.httpServer.listen 3000, ->
  url = 'http://localhost:3000'
  errorStatus = (code) -> new Error("Status Code is not #{code}")
  end = ->
    counter--
    if counter is 0 then apprentice.httpServer.close()

  counter++

  # route to root
  request url, (e, res, body) ->
    throw e if e
    throw errorStatus 200 if res.statusCode != 200
    assert.equal(res.headers['content-type'], mime.text)
    assert.equal(body, 'hello world')
    console.log 'GET /'
    end()

  counter++

  # post to root
  request.post url, body: 'foo=bar', headers: { 'accept': mime.text, 'content-type': mime.form}, (e, res, body) ->
    throw e if e
    throw errorStatus 201 if res.statusCode != 201
    assert.equal(res.headers['content-type'], mime.text)
    assert.equal(body, 'foo=bar')
    console.log 'POST / via form-urlencoded'
    end()

  counter++

  # put to root
  request.put url, body: 'foo=bar2', headers: { 'accept': mime.text, 'content-type': mime.form}, (e, res, body) ->
    throw e if e
    throw errorStatus 200 if res.statusCode != 200
    assert.equal(res.headers['content-type'], 'text/plain')
    assert.equal(body, 'foo=bar2')
    console.log 'PUT / via form-urlencoded'
    end()

  counter++

  # put to root
  request.del url, (e, res, body) ->
    throw e if e
    throw errorStatus 200 if res.statusCode != 200
    assert.equal(res.headers['content-type'], 'text/plain')
    assert.equal(body, 'delete me')
    console.log 'DELETE /'
    end()

