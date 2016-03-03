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

    // CardService.addCard().then(function (response) {
    //   console.log("added ", response.data);
    // });

  }
]);