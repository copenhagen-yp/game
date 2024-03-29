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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'author',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'author',
          key: 'id',
        }
      },
      topicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'topic',
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
