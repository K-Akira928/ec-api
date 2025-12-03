import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createExampleRequestDto } from "../dto/example/createExampleRequestDto.ts";

export const registry = new OpenAPIRegistry();

registry.register("CreateExampleRequestDto", createExampleRequestDto);

registry.registerPath({
  method: "post",
  path: "/examples",
  description: "Exampleを作成します",
  summary: "Example作成API",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createExampleRequestDto,
        },
      },
    },
  },
  responses: {
    200: {
      description: "成功時のレスポンス",
    },
  },
});
