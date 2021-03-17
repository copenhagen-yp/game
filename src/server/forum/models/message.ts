import { Model, DataType } from 'sequelize-typescript';
import { HasManyAddAssociationMixin } from 'sequelize';

import { sequelize } from '../../sequelize';
import { Author, Topic } from './';

class Message extends Model {
  public id!: number;
  public message!: string;
  public setAuthor!: HasManyAddAssociationMixin<Author, number>;
  public setTopic!: HasManyAddAssociationMixin<Topic, number>;
}

Message.init(
  {
    message: DataType.STRING,
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'message',
  }
);

export {
  Message,
};
