import { Model, DataType } from 'sequelize-typescript';

import { sequelize } from '../../sequelize';

class Theme extends Model {
  public id!: number;
  public name!: string;
}

Theme.init(
  {
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    }
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    tableName: 'themes',
  },
);

export { Theme };
