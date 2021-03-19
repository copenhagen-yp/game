'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('themes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      name: {
        type: Sequelize.STRING
      },
    });

    await queryInterface.createTable('themesUsers', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      ThemeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'themes',
          key: 'id',
        }
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('themes');
  }
};
