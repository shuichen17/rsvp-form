const mongoose = require('mongoose');

const rsvpSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  guests: Number
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp;