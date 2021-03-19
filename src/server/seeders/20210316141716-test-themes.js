'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('themes', [
      {
        id: 1,
        name: 'light',
      },
      {
        id: 2,
        name: 'dark'
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('themes', null, {});
  },
};
