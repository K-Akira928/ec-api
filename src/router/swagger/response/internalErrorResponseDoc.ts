import type { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import type { ResponseObject } from "@asteasolutions/zod-to-openapi/dist/types.js";
import { HTTP_STATUS } from "../../../const/http.ts";
import { internalErrorResponseDto } from "../../../dto/share/internalErrorResponseDto.ts";

export const internalErrorResponseDoc: Record<number, ResponseObject | ResponseConfig> = {
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: {
    description: "予期せぬエラーが発生",
    content: {
      "application/json": {
        schema: internalErrorResponseDto,
      },
    },
  },
};
