import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const allSequelizeOptions: {
  development: SequelizeOptions
} = {
  development: {
    host: 'postgres',
    port: 5432,
    username: 'root',
    password: 'rootPassword',
    database: 'postgres-db',
    dialect: 'postgres',
  },
};


const sequelizeOptions: SequelizeOptions = allSequelizeOptions[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(sequelizeOptions);

export {
  sequelize,
};
