"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const base_1 = require("./routes/base");
const logger_1 = require("./logger");
const io_1 = require("./io");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, cors_1.default)());
app.use(base_1.baseRoutes);
(0, io_1.socketioServer)(server);
server.listen(PORT, () => {
    logger_1.logger.info(`App running on port ${process.env.port || 5000}`);
});
//# sourceMappingURL=index.js.map