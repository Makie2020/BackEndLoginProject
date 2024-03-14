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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserRole = void 0;
const users_roles_1 = __importDefault(require("../models/users_roles"));
const editUserRole = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield users_roles_1.default
                .findAll({ where: { user_id: req.body.user_id } })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result.length > 0) {
                    yield users_roles_1.default.update({
                        role_id: req.body.role_id,
                    }, { where: { user_id: req.body.user_id } });
                    res.status(200).json({
                        message: "update successful",
                    });
                }
                else {
                    res.status(500).json({ message: "update failed" });
                }
            }));
        }
        catch (error) {
            res.status(404).json({ message: error });
        }
    });
};
exports.editUserRole = editUserRole;
