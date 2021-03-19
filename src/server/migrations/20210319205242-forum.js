'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('author', {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    });

    await queryInterface.createTable('topic', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: Sequelize.STRING(1000),
      AuthorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Author',
          key: 'id',
        }
      },
    });

    await queryInterface.createTable('message', {
      message: Sequelize.STRING(5000),
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      AuthorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Author',
          key: 'id',
        }
      },
      TopicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Topic',
          key: 'id',
        }
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('topic');
    await queryInterface.dropTable('author');
    await queryInterface.dropTable('message');
  }
};
