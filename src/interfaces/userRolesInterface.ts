import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface IUserRoles extends Model<InferAttributes<IUserRoles>, InferCreationAttributes<IUserRoles>> {
  id: CreationOptional<number>;
  user_id: string;
  role_id: string;
}

export default IUserRoles;