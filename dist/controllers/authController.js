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
exports.getRolesPermissions = exports.getPermissions = exports.getRoles = void 0;
const roles_1 = require("../models/roles");
const permissions_1 = require("../models/permissions");
const roles_permissions_1 = require("../models/roles_permissions");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_1.Role.findAll();
    res.json(roles);
});
exports.getRoles = getRoles;
const getPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permissions = yield permissions_1.Permissions.findAll();
    res.json(permissions);
});
exports.getPermissions = getPermissions;
const getRolesPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rolesPermissions = yield roles_permissions_1.RolesPermissions.findAll();
    res.json(rolesPermissions);
});
exports.getRolesPermissions = getRolesPermissions;
