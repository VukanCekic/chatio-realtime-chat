import express from "express";
export const baseRoutes = express.Router();

baseRoutes.get("/", (_, res) => {
  res.send("Server is up and running");
});

