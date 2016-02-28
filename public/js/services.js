var myApp = angular.module('myApp');


myApp.service('CardService', [
  '$http',//injected http so the service can access it
  function ($http) {//like ajax request
    
    this.getCards = function () {
      return $http({ method: 'GET', url: '/api' });//getting data from the endpoint 
    };

    this.addCard = function (title, priority) {
      var newCard = {
        title: title,
        priority: priority
      };
      cards.push(newCard);
    };
  }

]);

