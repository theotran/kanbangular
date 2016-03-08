'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var users = [];
    for (var i=0; i < 5; i++) {
      users.push({
        firstName: "Theo",
        lastName: "Tran",
        username: "teotran",
        password: "password",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Users', users);
  },


  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
