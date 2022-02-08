import express from "express";
import cors from "cors"
import { createServer } from "http";
import { baseRoutes } from "./routes/base";

import { logger } from "./logger";
import { socketioServer } from "./io";


const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(baseRoutes);

socketioServer(server);

server.listen(PORT, () => {
  logger.info(`App running on port ${process.env.port || 5000}`);
});


