var myApp = angular.module('myApp');

//controller talks to services, services talks to express server, express server talks to db, controller then manipulates the DOM

myApp.controller('MyController', [
  '$scope',
  'CardService',
  function ($scope, CardService) {//$scope." " is anything thats in your template

    $scope.CardService = CardService;
    $scope.cards = [];//initially set cards to an empty array since we used ng-repeat
    
    $scope.users = [];//same thing with users

    //getting our cards from the card db
    CardService.getCards().then(function (response) {
      $scope.cards = response.data;//then we set the value of cards with the actual data we get back from the server
    });

    //getting users form the Users db
    CardService.getUsers().then(function (response) {
      $scope.users = response.data;
    });

    $scope.deleteCard = function (id) {
      CardService.deleteCard(id).then(function (response) {
      //after we delete, fetch the cards and refresh the page
        CardService.getCards().then(function (response) {
          $scope.cards = response.data;//then we set the value of cards with the actual data we get back from the server
        });
      });
    };
    //creating a new card
    $scope.createCard = function ($event) {
      $event.preventDefault();
      var newCard = {//$event.target is what our values are in the form 
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
    // //creating a new user
    // $scope.createUser = function ($event) {
    //   $event.preventDefault();
    //   var newUser = {
    //     firstName: $event.target.firstName.value,
    //     lastName: $event.target.lastName.value,
    //     username: $event.target.username.value,
    //     password: $event.target.password.value 
    //   };
    //   console.log(newUser);
    //   CardService.createUser(newUser)
    //     .then(function (response) {
    //       CardService.getUsers().then(function (response) {
    //         $scope.users = response.data;
    //       });
    //     })
    //     .then(function () {//resetting our form with blank values after you create a user
    //       $scope.firstName = '';
    //       $scope.lastName = '';
    //       $scope.username = '';
    //       $scope.password = '';
    //     });
    // };

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