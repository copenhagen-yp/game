import { Model, DataType } from 'sequelize-typescript';
import { HasManyAddAssociationMixin, HasOneGetAssociationMixin } from 'sequelize';

import { Theme } from '../../theme/model/theme';

import { sequelize } from '../../sequelize';

class ThemeUser extends Model {
  public themeId!: number;
  public userId!: number;
  public setTheme!: HasManyAddAssociationMixin<Theme, number>;
  public getTheme!: HasOneGetAssociationMixin<Theme>;
}

ThemeUser.init(
  {
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    updatedAt: false,
    createdAt: false,
    tableName: 'themeUser',
  },
);

export { ThemeUser };
