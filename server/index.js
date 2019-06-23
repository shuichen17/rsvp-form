const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const controllers = require('../database/controllers/rsvp.js');
const Promise = require("bluebird");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/rsvps', (req, res) => {
 
  db.once('open', () => { })
  controllers.findRsvpAndUpdate(req.body, (err, data) => {
   // console.log('data:', data)
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      if(data === 'saved'){
        res.status(201);
        res.send(data);
      } else if (data === 'updated'){
        res.status(200);
        res.send(data);
      }
      }
  }) 
});
app.get('/rsvps', (req, res) => {
  db.once('open', () => { })
  controllers.readAll((err, docs) => {
    if(err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(docs);
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
