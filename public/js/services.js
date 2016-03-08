var myApp = angular.module('myApp');


myApp.service('CardService', [
  '$http',//injected http so the service can access it
  function ($http) {//like an ajax request
    
    this.getCards = function () {
      return $http({ method: 'GET', url: '/api' });//getting data from the endpoint 
    };

    this.getUsers = function () {
      return $http({ method: 'GET', url: '/api/users' });
    };
    this.createUser = function (data) {
      //same thing as above methods, just doing it a diff way .post
      return $http.post('/api/users', data);
    };

    this.deleteCard = function (id) {
      return $http({ method: 'POST', url: '/api/cards/' + id + '/delete'});
    };
    this.createCard = function (data) {
      //same thing as above methods, just doing it a diff way .post
      return $http.post('/api', data);
    };
    this.updateCard = function (id, status) { 
      return $http.put('/api/cards/' + id + '/edit', {status: status});//we are passing in status: status to our server so it will update to the db
    };
  }

]);

