"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/user', user_controller_1.getAllUser);
userRouter.put('/user/:user_id', user_controller_1.updateUserController);
