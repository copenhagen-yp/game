import { Model, DataType } from 'sequelize-typescript';

import { sequelize } from '../../sequelize';

class Topic extends Model {
  public id!: number;
  public title!: string;
  public authorId!: number;
}

Topic.init(
  {
    title: DataType.STRING,
    authorId: DataType.INTEGER,
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'topic',
  }
);

export {
  Topic,
};
