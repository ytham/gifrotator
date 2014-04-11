// core.js

var todoList = angular.module('todoList', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // When landing on page, get all of the todos
  $http.get('/api/todos')
    .success(function (data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function (err) {
      console.log('Error: ' + err);
    });

  $scope.createTodo = function () {
    $http.post('/api/todos', $scope.formData)
      .success(function (data) {
        $scope.formData = {}; // Clear the form after submitting
        $scope.todos = data;
        console.log(data);
      })
      .error(function (err) {
        console.log('Error: ' + err);
      });
  };

  $scope.deleteTodo = function (id) {
    $http.delete('/api/todos/' + id)
      .success(function (data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function (err) {
        console.log('Error: ' + err);
      });
  };
}