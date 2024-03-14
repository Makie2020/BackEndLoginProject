import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Permissions = sequelize.define('permissions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING, 
    allowNull: false
  }
});