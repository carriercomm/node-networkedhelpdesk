var needle = require('needle');

function Client(base_url, token) {
  this.base_url = base_url
  this.token = token || {}
}

Client.prototype.get = function (path, body, callback) {
  this.__send('get', path, body, callback);
}
Client.prototype.post = function (path, body, callback) {
  this.__send('post', path, body, callback);
}

Client.prototype.put = function (path, body, callback) {
  this.__send('put', path, body, callback);
}

Client.prototype.delete = function (path, body, callback) {
  this.__send('delete', path, body, callback);
}

Client.prototype.__send = function (method, path, body, callback) {
  var headers = { 'X-Ticket-Sharing-Version': '1' }
  if (this.token) {
    headers['X-Ticket-Sharing-Token'] = this.token
  }

  var options = {
    'headers': headers
  , 'json': true
  }

  needle.request(method, this.base_url + path, body, options, callback)
}

module.exports = Client
