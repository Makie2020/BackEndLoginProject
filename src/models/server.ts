import express, { Application } from 'express';
import cors from 'cors';

import productRouter from '../routes/productsRoutes';
import userRouter from '../routes/userRoutes';
import permissionRouter from '../routes/permissionsRouter';
import rolesRouter from '../routes/roleRoutes';

import { Product } from './product';
import { User } from './user';
import { Role } from './roles';
import { Permissions } from './permissions';
import { RolesPermissions } from './roles_permissions';
import RolesUsers from './users_roles';
import userRolesRouter from '../routes/userRolesRoute';
import rolePermissionsRouter from '../routes/rolePermissionsRoutes';


require('./associations')

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('App is running on port ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/products', productRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/roles', rolesRouter);
        this.app.use('/api/permissions', permissionRouter);
        this.app.use('/api/userRoles', userRolesRouter)
        this.app.use('/api/rolePermission', rolePermissionsRouter)
    }

    middlewares() {
        // Parse body
        this.app.use(express.json());
        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Product.sync();
            await User.sync();
            await Permissions.sync();
            await Role.sync();
            await RolesPermissions.sync();
            await RolesUsers.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
export default Server;