import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const RolesPermissions = sequelize.define("roles_permissions", {
  role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles', 
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'permissions', 
        key: 'id'
      }
    }
  });