var express = require('express');
var app = express();
var db = require('./models');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//making a static server
app.use(express.static(__dirname + '/public'));


//posting new 'cards' to our database!!!
app.post('/api', function (req, res) {
  var data = req.body;
  console.log(data);
  var card = {
    title: data.title,
    priority: data.priority,
    status: data.status,
    createdBy: data.createdBy,
    assignedTo: data.assignedTo
  };
  db.card.create(card)
    .then(function (cards) {
      console.log(cards);
      return res.redirect('/');
    });
});

//finding all from our database
app.get('/api', function (req, res) {
  db.card.findAll()
    .then(function (cards) {
      res.json(cards);
    });
});


var server = app.listen(8080, function () {
  console.log("server listening on ", server.address().port);
});