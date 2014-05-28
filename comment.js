var BaseObject = require('./base')
  , Actor = require('./actor')
  , Attachment = require('./attachment')
  , util = require('util');

function Comment(options) {
  BaseObject.call(this, options)
  if (this.author) {
    if (!(this.author instanceof Actor)) {
      this.author = new Actor(this.author)
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

util.inherits(Comment, BaseObject);

Comment._fields = ['uuid', 'author', 'body', 'authored_at'
  , 'attachments', 'public', 'custom_fields']

Comment.prototype.is_public = function() {
  return this.public == true
}

module.exports = Comment
