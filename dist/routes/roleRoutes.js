"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("../controllers/rolesController");
const rolesRouter = (0, express_1.Router)();
rolesRouter.get('/', rolesController_1.getRoles);
exports.default = rolesRouter;
