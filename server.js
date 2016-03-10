var express = require('express');
var app = express();
var db = require('./models');

var bodyParser = require('body-parser');

app.set('view engine', 'jade');//Tell Express which Template engine we are using by NPM module name
app.set('views', 'views');//tell express where our template files live

app.use(bodyParser.urlencoded({extended: false}));
//for bodyparser to know that the body being sent is a json obj 
app.use(bodyParser.json());

//since html5 only knows about post and get
// we use middleware (method-override) which allows us to put and delete   
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//making a static server
app.use(express.static(__dirname + '/public'));
// app.use(require('method-override'));


app.get('/login', function (req, res) {
  res.render('login');
});

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

//posting new users to our database
app.post('/create-user', function (req, res) {
  var data = req.body;
  console.log(data);
  var user = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    password: data.password
  };
  db.User.create(user)
    .then(function (user) {
      console.log(user);
      return res.redirect('/login');
    });
});

//deleting a user from the "Users" db
app.post('/api/users/:id/delete', function (req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function (deleteCount) {
    res.json({removed: deleteCount});
  });
});

//deleting a card
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

//editing a card
app.put('/api/cards/:id/edit', function (req, res) {
  var data = req.body;
  // var newValues = {
  //   title: data.title,
  //   priority: data.priority,
  //   status: data.status,
  //   createdBy: data.createdBy,
  //   assignedTo: data.assignedTo
  // };
  var query = { //tells the db where the card is, find this
    where: {id: req.params.id},
    returning: true 
  };
  db.card.update(data, query)
    .then(function (card) {
      return res.json(card);
    });
});

//finding all cards from our database
app.get('/api', function (req, res) {
  db.card.findAll()
    .then(function (cards) {
      res.json(cards);
    });
});

//finding all users from our database
app.get('/api/users', function (req, res) {
  db.User.findAll()
    .then(function (users) {
      res.json(users);
    });
});

var server = app.listen(8080, function () {
  console.log("server listening on ", server.address().port);
});