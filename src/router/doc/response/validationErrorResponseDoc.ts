import type { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import type { ResponseObject } from "@asteasolutions/zod-to-openapi/dist/types.js";
import { HTTP_STATUS } from "../../../const/http.ts";
import { validationErrorResponseDto } from "../../../dto/share/validationErrorResponseDto.ts";

export const validationErrorResponseDoc: Record<number, ResponseObject | ResponseConfig> = {
  [HTTP_STATUS.BAD_REQUEST]: {
    description: "入力内容が不正",
    content: {
      "application/json": {
        schema: validationErrorResponseDto,
      },
    },
  },
};
