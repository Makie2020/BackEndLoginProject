import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface IProduct extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
  id: CreationOptional<number>;
  name: string;
  price: number;
  description: string;
}