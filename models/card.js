

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {//model of Card
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
      title: {
        type: sequelize.STRING
      },
      priority: {
        type: sequelize.STRING
      },
      status: {
        type: sequelize.STRING
      },
      createdBy: {
        type: sequelize.STRING
      },
      assignedTo : {
        type: sequelize.STRING
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Card;
};