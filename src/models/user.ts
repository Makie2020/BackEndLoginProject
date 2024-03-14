import { DataTypes} from 'sequelize';
import sequelize from '../db/connection';
import { IUser } from '../interfaces/userInterface';

export const User = sequelize.define<IUser>('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.CHAR,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }    
}, 
)
