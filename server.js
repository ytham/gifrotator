var express = require('express');
var app = express();
var mongoose = require('mongoose');
var connect = require('connect');

var secret = require('./secret');
var mongoConnection = "mongodb://" + secret.user + ":" + secret.password + "@46.149.29.195:28017/gifro";

mongoose.connect(mongoConnection);

app.use(connect.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(connect.logger('dev'));
app.use(connect.bodyParser());              // pull information from html in POST
app.use(connect.methodOverride());            // simulate DELETE and PUT



var Todo = mongoose.model('Todo', {
  text: String
});

app.get('/api/todos', function (req, res) {
  Todo.find(function (err, todos) {
    if (err) res.send(err);
    res.json(todos);
  });
});

app.post('/api/todos', function (req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if (err) res.send(err);
    Todo.find(function (err, todos) {
      if (err) res.send(err);
      res.json(todos);
    });
  });
});

app.delete('/api/todos/:todo_id', function (req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if (err) res.send(err);

    // Get & return all todos after you create another
    Todo.find(function (err, todos) {
      if (err) res.send(err);
      res.json(todos);
    });
  });
});

app.get('*', function (req, res) {
  res.sendfile('./public/index.html');
});

app.listen(8888);
