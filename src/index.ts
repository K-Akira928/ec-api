import express from "express";
import { serve, setup } from "swagger-ui-express";
import { appConfig } from "./config/app.ts";
import { generateOpenApiDoc } from "./config/swagger.ts";
import { ExampleController } from "./controller/exampleController.ts";
import db from "./db/drizzle/connection.ts";
import { exampleRouter } from "./router/exampleRouter.ts";

const app = express();
const port = appConfig.APP_PORT;

app.use(express.json());
const document = generateOpenApiDoc();

app.use("/docs", serve, setup(document));
app.use("/examples", exampleRouter(ExampleController.build(db)));

app.listen(port, () => {});
