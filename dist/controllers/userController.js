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
exports.allUsers = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const users_roles_1 = __importDefault(require("../models/users_roles"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const roles_permissions_1 = require("../models/roles_permissions");
const connection_1 = __importDefault(require("../db/connection"));
dotenv_1.default.config();
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `A user with the name ${username} already exists.`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // create user
    try {
        yield user_1.User.create({
            username: username,
            password: hashedPassword,
        });
        // adding role as USER for user
        const user = yield user_1.User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No user exists.`
            });
        }
        try {
            yield users_roles_1.default.create({
                user_id: user.id,
                role_id: 2
            });
        }
        catch (error) {
            res.status(400).json({
                msg: 'Error',
                error
            });
        }
        res.json({
            msg: `User ${username} created!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_1.User.findAll({
        raw: true,
        where: { username: username },
        include: [
            {
                model: roles_permissions_1.RolesPermissions,
                attributes: ['permission_id'],
                required: false,
            },
            {
                model: users_roles_1.default,
                attributes: ['role_id'],
                required: false,
            }
        ]
    });
    const passwordValid = yield bcrypt_1.default.compare(password, user ? user[0].password : '');
    if (!user || !passwordValid) {
        return res.status(400).json({ error: 'User or password incorrect' });
    }
    const permission = user.map((user) => user['roles_permissions.permission_id']);
    const token = jsonwebtoken_1.default.sign({
        username: username,
        role: user[0]['users_role.role_id'],
        permission: permission
    }, process.env.SECRET_KEY);
    res.json(token);
});
exports.loginUser = loginUser;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield connection_1.default.query("SELECT  Users.*,  Users_roles.role_id, Roles_permissions.permission_id FROM Users LEFT JOIN Users_roles ON Users.id = Users_roles.user_id LEFT JOIN Roles_permissions ON Users_roles.role_id = Roles_permissions.role_id;");
    function joinUsersWithPermissions(results) {
        const userMap = new Map();
        results.forEach((userArray) => {
            userArray.forEach((user) => {
                if (userMap.has(user.id)) {
                    if (!userMap.get(user.id).permissions.includes(user.permission_id)) {
                        userMap.get(user.id).permissions.push(user.permission_id);
                    }
                }
                else {
                    userMap.set(user.id, {
                        id: user.id,
                        username: user.username,
                        role_id: user.role_id,
                        permissions: [user.permission_id]
                    });
                }
            });
        });
        return Array.from(userMap.values());
    }
    const joinedUsers = joinUsersWithPermissions(results);
    res.json(joinedUsers);
});
exports.allUsers = allUsers;
// exports.deleteUser = (req: Request, res: Response) => {
//     const id = req.params.id;
//     const index = User.findIndex((user: { id: string; }) => user.id == id);
//     if (index != -1) {
//       /* Remove the user from the users array */
//       User.splice(index, 1);
//       /* Send a JSON response with a success message */
//       res.json({ message: 'User deleted successfully' });
//     } else {
//       /* If no user with the specified ID was found, send a 404 response */
//       res.status(404).json({ message: `User with ID ${id} not found` });
//     }
//   };
