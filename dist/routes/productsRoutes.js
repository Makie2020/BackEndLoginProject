"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const productRouter = (0, express_1.Router)();
productRouter.get('/', validateToken_1.default, productsController_1.getProducts);
exports.default = productRouter;
