"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRolesController_1 = require("../controllers/userRolesController");
const userRolesRouter = (0, express_1.Router)();
userRolesRouter.patch('/', userRolesController_1.editUserRole);
exports.default = userRolesRouter;
