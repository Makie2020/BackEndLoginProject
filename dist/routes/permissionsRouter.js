"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissionController_1 = require("../controllers/permissionController");
const permissionRouter = (0, express_1.Router)();
permissionRouter.get('/', permissionController_1.getPermissions);
exports.default = permissionRouter;
