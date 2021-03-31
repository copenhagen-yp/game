'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('theme', {
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

    await queryInterface.createTable('themeUser', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      themeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'theme',
          key: 'id',
        }
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('theme');
    await queryInterface.dropTable('themeUser');
  }
};
