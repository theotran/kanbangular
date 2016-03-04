var myApp = angular.module('myApp');



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
      console.log($event.target.title.value);
      console.log($event.target.priority.value);
      console.log($event.target.createdBy.value);
      console.log($event.target.assignedTo.value);
      // CardService.createCard().then
    };
    $scope.updateStatus = function (status, card) {
      card.status = status;
    };
  }
]);