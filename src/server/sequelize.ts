import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: 5432,
  username: 'root',
  password: 'rootPassword',
  database: 'postgres-db',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

export {
  sequelize,
};
