'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'address', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
    await queryInterface.addColumn('Restaurants', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('Restaurants', 'notes', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'address');
    await queryInterface.removeColumn('Restaurants', 'rating');
    await queryInterface.removeColumn('Restaurants', 'notes');
  }
};