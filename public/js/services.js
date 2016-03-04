var myApp = angular.module('myApp');


myApp.service('CardService', [
  '$http',//injected http so the service can access it
  function ($http) {//like an ajax request
    
    this.getCards = function () {
      return $http({ method: 'GET', url: '/api' });//getting data from the endpoint 
    };

    this.deleteCard = function (id) {
      return $http({ method: 'POST', url: '/api/cards/' + id + '/delete'});
    };
    this.createCard = function () {
      return $http({ method: 'POST', url: '/api'});
    };
    
  }

]);

