var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//making a static server
app.use(express.static(__dirname + '/public'));


app.post('/api', function (req, res) {
  console.log(req.body);
  res.json(req.body);
});

app.get('/api', function (req, res) {
  res.send("Hi");
});


var server = app.listen(8080, function () {
  console.log("server listening on ", server.address().port);
});