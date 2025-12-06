import {
  createExampleRequestDto,
  createExampleResponseDto,
} from "../../../dto/example/createExampleDto.ts";
import { EXAMPLE_ROUTE } from "../../exampleRouter.ts";
import { registry } from "../generator.ts";
import { internalErrorResponseDoc } from "../response/internalErrorResponseDoc.ts";
import { validationErrorResponseDoc } from "../response/validationErrorResponseDoc.ts";

export const registerExampleDoc = () => {
  registry.register("CreateExampleRequestDto", createExampleRequestDto);
  registry.registerPath({
    method: "post",
    path: EXAMPLE_ROUTE,
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
      201: {
        description: "正常に作成",
        content: {
          "application/json": {
            schema: createExampleResponseDto,
          },
        },
      },
      ...validationErrorResponseDoc,
      ...internalErrorResponseDoc,
    },
  });
};
