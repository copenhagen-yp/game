'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('theme', [
      {
        name: 'light',
      },
      {
        name: 'dark'
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('theme', null, {});
  },
};
