var parts = [ 'Actor'
            , 'Agreement'
            , 'Attachment'
            , 'Comment'
            , 'HashedUUID'
            , 'Ticket'
            ]

parts.forEach(function (p) {
  module.exports[p] = require('./' + p.toLowerCase())
})
