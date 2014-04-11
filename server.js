var express = require('express');
var app = express();
var mongoose = require('mongoose');
var connect = require('connect');

var secret = require('./secret');
var mongoConnection = "mongodb://" + secret.user + ":" + secret.password + "@oceanic.mongohq.com:10093/gifro";

mongoose.connect(mongoConnection);

//var conn = connect();
//conn.use(require('morgan'));
app.use(connect.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(connect.logger('dev'));
app.use(connect.bodyParser());              // pull information from html in POST
app.use(connect.methodOverride());            // simulate DELETE and PUT



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
