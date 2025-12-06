import express from "express";
import { serve, setup } from "swagger-ui-express";
import { appConfig } from "./config/app.ts";
import { ExampleController } from "./controller/exampleController.ts";
import db from "./db/connection.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import { notFoundHandler } from "./middleware/notFoundHandler.ts";
import { exampleRouter } from "./router/exampleRouter.ts";
import { generateOpenApiDoc } from "./router/swagger/generator.ts";
import { registerExampleDoc } from "./router/swagger/path/exampleDoc.ts";

const app = express();
const port = appConfig.APP_PORT;

app.use(express.json());

registerExampleDoc();
const document = generateOpenApiDoc();

app.use("/docs", serve, setup(document));
app.use("/examples", exampleRouter(ExampleController.build(db)));

// 汎用レスポンス系ミドルウェア
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {});
