var express = require('express');
var app = express();
var mongoose = require('mongoose');

var secret = require('./secret');
var mongoConnection = "mongodb://" + secret.user + ":" + secret.password + "@oceanic.mongohq.com:10093/gifro";

mongoose.connect(mongoConnection);

app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(express.logger('dev'));             // log every request to the console
app.use(express.bodyParser());              // pull information from html in POST
app.use(express.methodOverride());            // simulate DELETE and PUT



var Todo = mongoose.model('Todo', {
  text: String
});

app.get('/api/todos', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
});

app.post('/api/todos', function (req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if (err) {
      res.send(err);
    }
    Todo.find(function (err, todos) {
      if (err) {
        res.send(err);
      }
      res.json(todos);
    });
  });
});

app.delete('/api/todos/:todo_id', function (req, res) {

});

app.listen(8888);
