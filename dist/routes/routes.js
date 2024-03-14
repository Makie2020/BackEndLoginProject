"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const rolesRouter = (0, express_1.Router)();
rolesRouter.get('/', authController_1.getRoles);
rolesRouter.get('/', authController_1.getPermissions);
rolesRouter.get('/', authController_1.getRolesPermissions);
exports.default = rolesRouter;
