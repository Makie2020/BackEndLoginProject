"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productsRoutes_1 = __importDefault(require("../routes/productsRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const permissionsRouter_1 = __importDefault(require("../routes/permissionsRouter"));
const roleRoutes_1 = __importDefault(require("../routes/roleRoutes"));
const product_1 = require("./product");
const user_1 = require("./user");
const roles_1 = require("./roles");
const permissions_1 = require("./permissions");
const roles_permissions_1 = require("./roles_permissions");
const users_roles_1 = __importDefault(require("./users_roles"));
const userRolesRoute_1 = __importDefault(require("../routes/userRolesRoute"));
const rolePermissionsRoutes_1 = __importDefault(require("../routes/rolePermissionsRoutes"));
require('./associations');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App is running on port ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/products', productsRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/roles', roleRoutes_1.default);
        this.app.use('/api/permissions', permissionsRouter_1.default);
        this.app.use('/api/userRoles', userRolesRoute_1.default);
        this.app.use('/api/rolePermission', rolePermissionsRoutes_1.default);
    }
    middlewares() {
        // Parse body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_1.Product.sync();
                yield user_1.User.sync();
                yield permissions_1.Permissions.sync();
                yield roles_1.Role.sync();
                yield roles_permissions_1.RolesPermissions.sync();
                yield users_roles_1.default.sync();
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.default = Server;
