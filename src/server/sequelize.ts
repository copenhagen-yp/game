import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import allSequelizeOptions from './config/config';

const sequelizeOptions: SequelizeOptions = allSequelizeOptions[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(sequelizeOptions);

export {
  sequelize,
};
