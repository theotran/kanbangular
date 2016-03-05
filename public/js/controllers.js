var myApp = angular.module('myApp');

//controller talks to services, services talks to express server, express server talks to db, controller then manipulates the DOM

myApp.controller('MyController', [
  '$scope',
  'CardService',
  function ($scope, CardService) {//$scope." " is anything thats in your template

    $scope.CardService = CardService;
    $scope.cards = [];//initially set cards to an empty array since we used ng-repeat
    CardService.getCards().then(function (response) {
      $scope.cards = response.data;//then we set the value of cards with the actual data we get back from the server
    });
    $scope.deleteCard = function (id) {
      CardService.deleteCard(id).then(function (response) {
      //after we delete, fetch the cards and refresh the page
        CardService.getCards().then(function (response) {
          $scope.cards = response.data;//then we set the value of cards with the actual data we get back from the server
        });
      });
    };
    $scope.createCard = function ($event) {
      $event.preventDefault();
      var newCard = {
        title: $event.target.title.value,
        priority: $event.target.priority.value,
        status: "queue",
        createdBy: $event.target.createdBy.value,
        assignedTo: $event.target.assignedTo.value
      };
      // console.log(newCard);
      CardService.createCard(newCard)
        .then(function (response) {//then refresh
          CardService.getCards().then(function (response) {
             $scope.cards = response.data;
           });
        });
    };
    $scope.updateStatus = function (id, status, card) {
      CardService.updateCard(id, status)
        .then(function (response) {//then refresh
          CardService.getCards().then(function (response) {
             $scope.cards = response.data;
           });
        });
    };
  }
]);