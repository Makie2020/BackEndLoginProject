import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<number>;
  username: string;
  password: string;
}

export interface IUserInfo extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: number;
  username: string;
  password: string;
  'roles_permissions.permission_id'?: CreationOptional<number[]>;
  'users_role.role_id'?: CreationOptional<any>;
}
