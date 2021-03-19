'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('themes', [
      {
        name: 'light',
      },
      {
        name: 'dark'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('themes', null, {});
  },
};
