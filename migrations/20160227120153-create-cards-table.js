'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('cards', { //creates tables of cards
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      assignedTo : {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW, 
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW, 
        allowNull: false,
      }

    });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('cards');
  }
};
