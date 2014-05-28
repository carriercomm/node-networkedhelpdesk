var util = require('util')
  , Client = require('./client')
  , Actor = require('./actor')
  , BaseObject = require('./base')
  , Ticket = require('./ticket');

function Agreement(options) {
  BaseObject.call(this, options)
  if (this.current_actor) {
    if (!(this.current_actor instanceof Actor)) {
      this.current_actor = new Actor(this.current_actor)
    }
  }
}

util.inherits(Agreement, BaseObject)

Agreement._fields = ['receiver_url', 'sender_url', 'status'
  , 'uuid', 'access_key', 'name', 'deactivated_by'
  , 'current_actor', 'sync_tags', 'sync_custom_fields'
  , 'allows_public_comments']

Agreement.prototype.send = function (url, callback) {
  new Client(url).post(this.relative_url(), this, callback);
}

Agreement.prototype.update = function (url, callback) {
  new Client(url, this.token()).put(this.relative_url(), this, callback);
}

Agreement.prototype.relative_url = function () {
  return '/agreements/' + this.uuid
}

Agreement.prototype.token = function () {
  return this.uuid + ':' + this.access_key
}

Agreement.prototype.sender = function () {
  return this.sender_url
}

Agreement.prototype.receiver = function () {
  return this.receiver_url
}

Agreement.prototype.ticket = function (options) {
  return new Ticket(this, options);
}

module.exports = Agreement
