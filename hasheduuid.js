var crypto = require('crypto')
  , uuid = require('uuid');

function HashedUUID() {
}

HashedUUID.from_url = function (url) {
  var sha1 = crypto.createHash('sha1')
  sha1.update(url)
  return sha1.digest('hex')
}

HashedUUID.random = function () {
  var sha1 = crypto.createHash('sha1')
  sha1.update(uuid.v4())
  return sha1.digest('hex')
}

module.exports = HashedUUID
