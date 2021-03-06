"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importStar(require("winston"));
const myCustomFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.json());
let alignColorsAndTime = winston_1.default.format.combine(winston_1.default.format.colorize({
    all: true,
}), winston_1.default.format.label({
    label: "[LOGGER]",
}), winston_1.default.format.timestamp({
    format: "YY-MM-DD HH:MM:SS",
}), winston_1.default.format.printf((info) => ` ${info.label} ${info.timestamp} ${info.level} : ${info.message}`));
exports.logger = (0, winston_1.createLogger)({
    level: "debug",
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), alignColorsAndTime),
    transports: [new winston_1.transports.Console()],
});
//# sourceMappingURL=logger.js.map