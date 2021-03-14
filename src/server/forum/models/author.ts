import { Model, DataType } from 'sequelize-typescript';

import { sequelize } from '../../sequelize';

class Author extends Model {
  public firstName!: string;
  public lastName!: string;
  public id!: number;
}

Author.init(
  {
    firstName: DataType.STRING,
    lastName: DataType.STRING,
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'author',
  }
);

export {
  Author
};
