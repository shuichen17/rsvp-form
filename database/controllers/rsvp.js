const Rsvp = require('../models/rsvp.js');
const findRsvpAndUpdate = (param, callback) => {
    let newRsvp = new Rsvp({
        firstName: param.firstName,
        lastName: param.lastName,
        email: param.email,
        guests: Number(param.numberOfGuests)
    });
    Rsvp.findOneAndUpdate({ email: param.email }, {
            $set: {
                firstName: param.firstName,
                lastName: param.lastName, 
                guests: Number(param.numberOfGuests)
            }
        }, { new: true, useFindAndModify: true },
            (err, doc) => {
                if (err) {
                    throw err;
                }
                if (!doc) {
                    newRsvp.save((err) => {
                        if (err) return handleError(err);
                        callback(null, "saved");
                    });
                } else {
                    callback(null, "updated");
                }
            });
    };
const readAll = (callback) => {
    Rsvp.find({}).exec((err, docs) => {
        if(err) return console.log(err);
        callback(null, docs);
    })
}

module.exports = {
    findRsvpAndUpdate: findRsvpAndUpdate,
    readAll: readAll
}