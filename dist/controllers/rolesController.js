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
exports.editRole = exports.getRoles = void 0;
//Model
const roles_1 = require("../models/roles");
const roles_permissions_1 = require("../models/roles_permissions");
const permissions_1 = require("../models/permissions");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield roles_1.Role.findAll();
    res.json(roles);
});
exports.getRoles = getRoles;
const editRole = (req, res) => {
    if (!req.body.role_id || !req.body.permission_id) {
        res.status(400).send({
            message: "Please provide role_id, and permission_id"
        });
        return;
    }
    Promise.all([
        roles_1.Role.findByPk(req.body.role_id),
        permissions_1.Permissions.findByPk(req.body.permission_id)
    ])
        .then(([role, permission]) => {
        if (!role) {
            res.status(400).send({
                message: "Role not found!"
            });
            return;
        }
        if (!permission) {
            res.status(400).send({
                message: "Permission not found!"
            });
            return;
        }
        let linkData = req.body;
        roles_permissions_1.RolesPermissions.create(linkData)
            .then(() => {
            res.send({ message: "Permissions assigned successfully!" });
        })
            .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while linking the entities."
            });
        });
    })
        .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while checking the entities."
        });
    });
};
exports.editRole = editRole;
