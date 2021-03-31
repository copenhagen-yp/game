import { Model, DataType } from 'sequelize-typescript';
import { HasManyAddAssociationMixin } from 'sequelize';

import { sequelize } from '../../sequelize';
import { Author } from './author';

class Topic extends Model {
  public id!: number;
  public title!: string;
  public setAuthor!: HasManyAddAssociationMixin<Author, number>;
}

Topic.init(
  {
    title: DataType.STRING(1000),
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
