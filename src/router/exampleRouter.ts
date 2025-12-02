import { Router } from "express";
import type { ExampleController } from "../controller/exampleController.ts";

export function exampleRouter(exampleController: ExampleController) {
  const router = Router();

  router.post("/", exampleController.create);

  return router;
}
