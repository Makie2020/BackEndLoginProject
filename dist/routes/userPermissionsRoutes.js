"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesPermissionsController_1 = require("../controllers/rolesPermissionsController");
const rolePermissionsRouter = (0, express_1.Router)();
rolePermissionsRouter.get('/', rolesPermissionsController_1.getUserPermissions);
exports.default = rolePermissionsRouter;
