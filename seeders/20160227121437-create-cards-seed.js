'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {
    var cards = [];
    for (var i=0; i < 5; i++) {
      cards.push({
        title: "Train",
        priority: "high",
        status: "queue",
        createdBy: "Admin",
        assignedTo: "User",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('cards', cards);
  },


  down: function (queryInterface, Sequelize) {
 
      return queryInterface.bulkDelete('cards', null, {});

  }
};
