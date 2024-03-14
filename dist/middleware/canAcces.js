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
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = require("../models/roles");
const permissions_1 = require("../models/permissions");
exports.default = (permission) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const access = yield permissions_1.Permissions.findOne({
        where: { name: permission },
        include: [{ attributes: ['id', 'name'], model: roles_1.Role, as: 'roles', through: { attributes: [] } }],
    });
    if (yield req.userData.hasPermissionTo(access)) {
        return next();
    }
    console.error('You do not have the authorization to access this.');
    return false;
});
