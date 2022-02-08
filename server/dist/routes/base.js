"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.baseRoutes = express_1.default.Router();
exports.baseRoutes.get("/", (_, res) => {
    res.send("Server is up and running");
});
//# sourceMappingURL=base.js.map