import type { Express } from "express";
import express from "express";
import { serve, setup } from "swagger-ui-express";
import { ExampleController } from "../controller/exampleController.ts";
import type { DrizzleDb } from "../db/connection.ts";
import { errorHandler } from "../middleware/errorHandler.ts";
import { notFoundHandler } from "../middleware/notFoundHandler.ts";
import { EXAMPLE_ROUTE, exampleRouter } from "./path/exampleRouter.ts";
import { generateOpenApiDoc } from "./swagger/generator.ts";
import { registerExampleDoc } from "./swagger/path/exampleDoc.ts";

export const registerRouters = (app: Express, db: DrizzleDb) => {
  // Swagger Doc
  registerExampleDoc();

  // Swagger UI
  const document = generateOpenApiDoc();
  app.use("/docs", serve, setup(document));

  // JSONボディパーサー
  app.use(express.json());

  // API
  app.use(EXAMPLE_ROUTE, exampleRouter(ExampleController.build(db)));

  // 汎用レスポンス系ミドルウェア
  app.use(notFoundHandler);
  app.use(errorHandler);
};
