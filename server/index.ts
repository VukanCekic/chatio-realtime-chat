import express from "express";
import { createServer } from "http";
import { baseRoutes } from "./routes/base";

import { logger } from "./logger";
import { socketioServer } from "./io";

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);

socketioServer(server);
server.listen(PORT, () => {
  logger.info(`App running on port ${process.env.port || 5000}`);
});


app.use(baseRoutes);