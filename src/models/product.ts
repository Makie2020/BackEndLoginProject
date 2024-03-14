import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { IProduct } from '../interfaces/productInterface';

export const Product = sequelize.define<IProduct>('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
}, )