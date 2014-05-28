var BaseObject = require('./base')
  , util = require('util');

function Attachment(options) {
  BaseObject.call(this, options)
}

util.inherits(Attachment, BaseObject)

Attachment._fields = ['url', 'filename', 'content_type'
  , 'display_filename']

module.exports = Attachment
