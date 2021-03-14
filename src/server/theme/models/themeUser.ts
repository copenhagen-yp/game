import { Model, DataType } from 'sequelize-typescript';

import { sequelize } from '../../sequelize';

class ThemeUser extends Model {
  public id!: number;
  public themeId!: number;
  public userId!: number;
}

ThemeUser.init(
  {
    themeId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    tableName: 'themesUsers',
  },
);

export { ThemeUser };
