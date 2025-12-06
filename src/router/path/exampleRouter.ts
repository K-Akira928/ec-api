import { Router } from "express";
import type { ExampleController } from "../../controller/exampleController.ts";

export const EXAMPLE_ROUTE = "/examples";

export function exampleRouter(exampleController: ExampleController) {
  const router = Router();

  router.post("/", exampleController.create);

  return router;
}
