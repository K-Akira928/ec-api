import express from "express";
import { appConfig } from "./config/app.ts";
import { getDb } from "./db/connection.ts";
import { registerRouters } from "./router/registerRouters.ts";

const app = express();
const port = appConfig.APP_PORT;

registerRouters(app, await getDb());

app.listen(port, () => {});
