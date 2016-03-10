var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var path = require('path');//

//requiring for authentication/passport/etc...
var CONFIG = require('./server-config.json');//required for sessions
var passport = require('passport');
var localStrategy = require('passport-local');
var session = require('express-session');


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


//configurations for cookies/sessions
app.use(session(CONFIG.SESSION));//configuring sessions
app.use(passport.initialize());
app.use(passport.session());


//looking in our Users database for the user!
passport.use(new localStrategy(
  function (username, password, done) {
    db.User.find({
      where: {
        username: username
      }
    }).
    then(function (user) {
      //if no user found
      if (!user) {//not authenticated
        
        return done(null, false);
      }
      //if user is found
      if (user.password === password) {
        console.log("hooray!");
        return done(null, user);//authenticated
      }
    });
}));

passport.serializeUser(function (user, done) {//putting an id on our object
  console.log(user);
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {//grabbing the id on our object
  console.log('your id is :', id);
  db.User.findById(id)
    .then(function (user) {
      return done(null, user);
    });
});

function isAuthenticated (req, res, next) {
  if (!req.isAuthenticated()) {
    return  res.redirect('/login');
  }
  return next();
}



app.get('/login', function (req, res) {
  res.render('login');
});


app.post('/login',
  passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login'
  })
);

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


app.get('/', isAuthenticated, function (req, res) {
  res.sendFile(path.resolve('./public/kanban.html'));//makes the path more absolute, helps get the filename etc...
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