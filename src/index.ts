import express from "express";
import { serve, setup } from "swagger-ui-express";
import { appConfig } from "./config/app.ts";
import { generateOpenApiDoc } from "./config/swagger.ts";
import { createExampleController } from "./controller/exampleController.ts";
import { exampleRouter } from "./router/exampleRouter.ts";

const app = express();
const port = appConfig.APP_PORT;

app.use(express.json());
const document = generateOpenApiDoc();

app.use("/docs", serve, setup(document));
app.use("/examples", exampleRouter(createExampleController()));

app.listen(port, () => {});
