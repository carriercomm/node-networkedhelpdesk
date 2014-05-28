var Agreement = require('../agreement')
  , Ticket = require('../ticket')
  , Actor = require('../actor')
  , Comment = require('../comment')
  , Attachment = require('../attachment')
  , Hashed = require('../hasheduuid')
  , assert = require('assert')
//  , nock = require('nock')

/* global suite, suiteSetup, test */

suite('Agreement', function() {
  var agreement = null;

  suiteSetup(function (done) {
    var obj = {
      'receiver_url': 'http://sharing.example.com/sharing',
      'sender_url': 'http://shared.example.com/sharing',
      'uuid': Hashed.random(),
      'access_key': Hashed.random(),
      'name': 'Sharing Example',
      'current_actor': {
        'name': 'Testy McTesterson',
        'uuid': Hashed.from_url('http://shared.example.com/sharing/user/1')
      },
      'sync_tags': false,
      'sync_custom_fields': false,
      'allow_public_comments': true
    }

    agreement = new Agreement(obj)
    done()
  })

  test('Should create Agreement from JSON', function () {
    assert(agreement)
  })

  test('Created agreement should by instanceof Agreement', function () {
    assert(agreement instanceof Agreement);
  });

  suite('Zendesk', function () {
    test('current_actor should be instanceof Actor', function () {
      assert(agreement.current_actor instanceof Actor)
    })
  })

  suite('Ticket', function () {
    var ticket = null;

    suiteSetup(function (done) {
      var obj = {
        'uuid': Hashed.from_url('http://shared.example.com/sharing/ticket/1'),
        'status': 'open',
        'current_actor': {
          'name': 'Testy McTesterson',
          'uuid': Hashed.from_url('http://shared.example.com/sharing/user/1')
        },
        'subject': 'The printer is on fire!',
        'requested_at': '2014-01-01',
        'requester': {
          'name': 'John Doe',
          'role': 'end-user',
          'uuid': Hashed.from_url('john_doe@example.org')
        },
        'comments': [
          {
            'uuid': Hashed.from_url('http://shared.example.com/sharing/ticket/1/comment/1'),
            'author': {
              'name': 'John Doe',
              'role': 'end-user',
              'uuid': Hashed.from_url('http://shared.example.com/sharing/user/2')
            },
            'body': 'Seriously, it\'s on fire, can you put it out?',
            'public': true
          },
          {
            'uuid': Hashed.from_url('http://shared.example.com/sharing/ticket/1/comment/2'),
            'author': {
              'name': 'Testy McTesterson',
              'role': 'agent',
              'uuid': Hashed.from_url('http://shared.example.com/sharing/user/1')
            },
            'body': 'Confirmed printer is on fire',
          },
          {
            'uuid': Hashed.from_url('http://shared.example.com/sharing/ticket/1/comment/3'),
            'author': {
              'name': 'Testy McTesterson',
              'role': 'agent',
              'uuid': Hashed.from_url('http://shared.example.com/sharing/user/1')
            },
            'body': 'Fire extinguisher applied',
            'public': true
          },
          {
            'uuid': Hashed.from_url('http://shared.example.com/sharing/ticket/1/comment/4'),
            'author': {
              'name': 'Testy McTesterson',
              'role': 'agent',
              'uuid': Hashed.from_url('http://shared.example.com/sharing/user/1')
            },
            'body': 'Shit Tyronne, Get it together!',
            'public': false,
            'attachments': [{
              'url': 'http://shared.example.com/ticket/1/attachment/1',
              'filename': 'printer_fire.jpg',
              'content_type': 'image/jpeg',
              'display_filename': 'printer_fire.jpg'
            }]
          }
        ]
      }

      ticket = new Ticket(agreement, obj)
      done()
    })

    test('Should create Ticket from JSON', function () {
      assert(ticket)
    })

    test('Should be instanceof Ticket', function () {
      assert(ticket instanceof Ticket)
    })

    test('current_actor should be instanceof Actor', function () {
      assert(ticket.current_actor instanceof Actor)
    })

    test('requester should be instanceof Actor', function () {
      assert(ticket.requester instanceof Actor)
    })

    suite('Comments', function () {
      test('comments should be instanceof Array', function () {
        assert(ticket.comments instanceof Array)
      })

      test('Each comment should be instanceof Comment', function () {
        assert(ticket.comments.every(function (el) {
          return el instanceof Comment
        }))
      })

      test('Author should be instanceof Author', function () {
        assert(ticket.comments.every(function (el) {
          return el.author instanceof Actor
        }))
      })

      suite('Zendesk', function () {
        test('Public comments must set public to true', function () {
          assert(ticket.comments.filter(function (el) {
            return el.is_public()
          }).every(function (el) {
            return el.public
          }))
        })

        test('Any comment that is not specifically public is private', function () {
          assert(ticket.comments.filter(function (el) {
            return !el.public
          }).every(function (el) {
            return !el.is_public()
          }))
        })
      })

      suite('Attachments', function () {
        test('Some comment should have attachments', function () {
          assert(ticket.comments.some(function (el) {
            if (el.attachments) {
              return true
            }
          }))
        })

        test('Attachments should be instanceof Array', function () {
          assert(ticket.comments.filter(function (el) {
            if (el.attachments) {
              return true
            }
          }).every(function (el) {
            return el.attachments instanceof Array
          }))
        })

        test('Individual attachments should be instanceof Attachment', function () {
          assert(ticket.comments.filter(function (el) {
            if (el.attachments) {
              return true
            }
          }).every(function (el) {
            return el.attachments.every(function (el) {
              return el instanceof Attachment
            })
          }))
        })
      })
    })

    suite('Custom Fields', function (){
      test('custom_fields should be instanceof Array')

      test('custom_fields namespacing?')
    })
  })
})

suite('Actor', function () {
  var user = null
  var agent = null
  suiteSetup(function () {
    user = new Actor({
      'name': 'John Doe',
      'uuid': Hashed.from_url('http://www.example.com/sharing/user/2')
    })

    agent = new Actor({
      'name': 'Testy McTesterson',
      'role': 'agent',
      'uuid': Hashed.from_url('http://www.example.com/sharing/user/1')
    })
  })

  suite('Zendesk', function () {
    test('No role does not equal agent', function () {
      assert(user.is_agent() === false)
    })

    test('Role of "end-user" should not equal agent', function () {
      user.role = 'end-user'
      assert(user.is_agent() === false)
    })

    test('Role of "agent" should equal agent', function () {
      assert(agent.is_agent())
    })
  })

  test('2 users should not share their UUID', function () {
    assert(agent.uuid != user.uuid)
  })
})

suite('HashedUUID', function () {
  test('Hashing a known value should return a fixed hash', function () {
    assert(
      Hashed.from_url('http://www.example.com/sharing/ticket/1') ==
      '3912304500bbbc6ce97e6eee3eb3df4f34de0437'
    )
  })
})

suite('Client', function () {
  /* I really should implement these using nock */
  test('GET')
  test('POST')
  test('PUT')
  test('DELETE')
})
