var BaseObject = require('./base')
  , Client = require('./client')
  , Actor = require('./actor')
  , Comment = require('./comment')
  , Attachment = require('./attachment')
  , util = require('util')
  , _ = require('underscore');

function Ticket(agreement, options) {
  BaseObject.call(this, options)
  this.agreement = agreement

  if (this.current_actor) {
    if (!(this.current_actor instanceof Actor)) {
      this.current_actor = new Actor(this.current_actor)
    }
  }

  if (this.requester) {
    if (!(this.requester instanceof Actor)) {
      this.requester = new Actor(this.requester)
    }
  }

  if (this.comments) {
    for (var comment in this.comments) {
      if (!(this.comments[comment] instanceof Comment)) {
        this.comments[comment] = new Comment(this.comments[comment])
      }
    }
  }

  if (this.attachments) {
    for (var attachment in this.attachments) {
      if (!(this.attachments[attachment] instanceof Attachment)) {
        this.attachments[attachment] = new Attachment(this.attachments[attachment])
      }
    }
  }
}

util.inherits(Ticket, BaseObject);

Ticket._fields = ['uuid', 'status', 'current_actor'
  , 'comments', 'subject', 'requested_at', 'requester'
  ,  'tags', 'original_id', 'custom_fields']

Ticket.prototype.share = function(url, callback) {
  new Client(url, this.agreement.token()).post(this.relative_url()
            , _(this).omit('agreement'), callback)
}

Ticket.prototype.update = function(url, callback) {
  new Client(url, this.agreement.token()).put(this.relative_url()
            , _(this).omit('agreement'), callback)
}

Ticket.prototype.unshare = function(url, callback) {
  new Client(url, this.agreement.token()).delete(this.relative_url(), callback)
}

Ticket.prototype.relative_url = function() {
  return '/tickets/' + this.uuid
}

module.exports = Ticket
