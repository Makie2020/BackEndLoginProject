import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

const Users_Roles = sequelize.define("users_roles", {
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', 
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  },);
  
  export default Users_Roles