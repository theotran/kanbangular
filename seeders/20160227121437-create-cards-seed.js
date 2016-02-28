'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {
    var cards = [];
    for (var i=0; i < 5; i++) {
      cards.push({
        title: "Top Jits Students",
        priority: "Top",
        status: "Promoted",
        createdBy: "Coach",
        assignedTo: "Theo",
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
