import { Model, DataType } from 'sequelize-typescript';

import { sequelize } from '../sequelize';

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
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    tableName: 'themes',
  },
);

export { Theme };
