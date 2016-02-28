var express = require('express');
var app = express();
var db = require('./models');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//making a static server
app.use(express.static(__dirname + '/public'));


//posting new 'cards' to our database!!!
app.post('/api', function (req, res) {
  db.card.create({
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo,
  })
  .then(function (cards) {
    res.json(cards);
  });
});

//finding all from our database
app.get('/api', function (req, res) {
  db.card.findAll({})
    .then(function (cards) {
      res.json(cards);
    });
});


var server = app.listen(8080, function () {
  console.log("server listening on ", server.address().port);
});