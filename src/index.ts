import express from "express";
import { appConfig } from "./config/app.ts";
import { createExampleController } from "./controller/exampleController.ts";
import { exampleRouter } from "./router/exampleRouter.ts";

const app = express();
const port = appConfig.APP_PORT;

app.use(express.json());

app.use("/examples", exampleRouter(createExampleController()));

app.listen(port, () => {});
