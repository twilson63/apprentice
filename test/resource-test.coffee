request = require 'request'
assert = require 'assert'
apprentice = require '../'
mime = require '../lib/mime'
pin = require 'linchpin'

pin.on 'GET/foo', (req, res) -> res.json { params: req.params, resource: req.resource }
pin.on 'POST/foo', (req, res) -> res.json { params: req.params, resource: req.resource }, 201
pin.on 'GET/foo/*', (req, res) -> res.json { params: req.params, resource: req.resource, id: req.resourceId }
pin.on 'PUT/foo/*', (req, res) -> res.json { params: req.params, resource: req.resource, id: req.resourceId }
pin.on 'DELETE/foo/*', (req, res) -> res.json { resource: req.resource, id: req.resourceId }

#pin.on 'LOG', (entry) -> console.log entry

counter = 0

# apprentice.httpServer.on 'request', (req, res) ->
#   req.connection.setTimeout = 20000

apprentice.httpServer.listen 3000, ->
  url = 'http://localhost:3000/foo'
  errorStatus = (code) -> new Error("Status Code is not #{code}")
  end = ->
    counter--
    if counter is 0 then apprentice.httpServer.close()

  counter++

  # route to root
  request url, json: true, (e, res, body) ->
    throw e if e
    throw errorStatus 200 if res.statusCode != 200
    assert.equal(res.headers['content-type'], mime.json)
    assert.equal(body.resource, 'foo')
    console.log 'GET /'
    end()
  
  counter++
  
  # post to root
  request.post url, json: {foo:'bar'}, (e, res, body) ->
    throw e if e
    throw errorStatus 201 if res.statusCode != 201
    assert.equal(res.headers['content-type'], mime.json)
    assert.equal(body.resource, 'foo')
    assert.equal(body.params.foo, 'bar')
    console.log 'POST / via json'
    end()
  
  counter++
  
  # put to root
  request.put url + '/1', json: {foo: 'bar2'}, (e, res, body) ->
    throw e if e
    throw errorStatus 200 if res.statusCode != 200
    assert.equal(res.headers['content-type'], mime.json)
    assert.equal(body.resource, 'foo')
    assert.equal(body.params.foo, 'bar2')
    assert.equal(body.id, 1)
    console.log 'PUT / via json'
    end()
  # 
  counter++
  
  # put to root
  request.del url + '/1', json: true, (e, res, body) ->
    throw e if e
    throw errorStatus 200 if res.statusCode != 200
    assert.equal(res.headers['content-type'], mime.json)
    assert.equal(body.resource, 'foo')
    assert.equal(body.id, 1)
    console.log 'DELETE / via json'
    end()
  
