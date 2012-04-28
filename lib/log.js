var pin = require('linchpin');
module.exports = function(type, msg) {
  pin.emit('LOG', { type: type, msg: msg, date: (new Date()).toString()});
}