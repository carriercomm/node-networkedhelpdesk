```javascript
var networkedhelpdesk = require('networkedhelpdesk')
var agreement = new networkedhelpdesk.Agreement({
  //JSON Agreement data here
  'uuid': networkedhelpdesk.HashedUUID.from_url('http://anothershare.example.net/sharing/agreements/12345'),
  'name': 'Ticket Sharing',
  'receiver_url': 'http://shared.example.com/sharing',
  'sender_url': 'http://anothershare.example.net/sharing',
  'access_key': networkedhelpdesk.HashedUUID.random(),
  'status': 'pending'
})

agreement.send(agreement.receiver, function (err, response) {
  //do stuff here
})

agreement.status = 'inactive'
agreement.deactivated_by = 'sender'

agreement.update(agreement.receiver, function (err, response) {
  // do stuff here
})

// Create Ticket attached to current agreement
var ticket = agreement.ticket()

// Create ticket with supplied agreement
ticket = new networkedhelpdesk.Ticket(
  agreement,
  {
    //JSON Ticket Data here
  }
)

ticket.share(agreement.receiver, function (err, response) {
  // Do stuff here?
})

ticket.update(agreement.receiver, function (err, response) {
  // Do stuff here?
})

ticket.unshare(agreement.receiver, function (err, response) {
  // Do stuff here?
})
```
