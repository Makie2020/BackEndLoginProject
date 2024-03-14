"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
const canAccess_1 = __importDefault(require("../middlewares/canAccess"));
const AdminController_1 = __importDefault(require("../controllers/AdminController"));
const router = express_1.default.Router();
router.get('/admin', Auth_1.default, (0, canAccess_1.default)(1), AdminController_1.default.users);
exports.default = router;
