var BaseObject = require('./base')
  , util = require('util');

function Actor(options) {
  BaseObject.call(this, options)
}

util.inherits(Actor, BaseObject)

Actor._fields = ['uuid', 'name', 'role']

Actor.prototype.is_agent = function() {
  return this.role == 'agent'
}

module.exports = Actor
