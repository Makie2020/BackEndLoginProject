"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const checkRole_1 = require("../middleware/checkRole");
const adminRouter = (0, express_1.Router)();
adminRouter.get('/', validateToken_1.default, checkRole_1.authorizationRole, authController_1.getRoles);
exports.default = adminRouter;
