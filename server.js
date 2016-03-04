var express = require('express');
var app = express();
var db = require('./models');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//making a static server
app.use(express.static(__dirname + '/public'));
// app.use(require('method-override'));

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
    .then(function (card) {
      console.log(card);
      return res.json(card);
    });
});

//deleting 
app.post('/api/cards/:id/delete', function (req, res) {
  db.card.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function (deleteCount) {
    res.json({removed: deleteCount});
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