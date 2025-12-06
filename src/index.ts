import express from "express";
import { appConfig } from "./config/app.ts";
import db from "./db/connection.ts";
import { registerRouters } from "./router/registerRouters.ts";

const app = express();
const port = appConfig.APP_PORT;

registerRouters(app, db);

app.listen(port, () => {});
