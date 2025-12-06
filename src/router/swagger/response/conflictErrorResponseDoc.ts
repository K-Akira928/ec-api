import type { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import type { ResponseObject } from "@asteasolutions/zod-to-openapi/dist/types.js";
import { HTTP_STATUS } from "../../../const/http.ts";
import { conflictErrorResponseDto } from "../../../dto/share/conflictErrorResponseDto.ts";

export const conflictErrorResponseDoc: Record<number, ResponseObject | ResponseConfig> = {
  [HTTP_STATUS.CONFLICT]: {
    description: "リソースが既に存在します",
    content: {
      "application/json": {
        schema: conflictErrorResponseDto,
      },
    },
  },
};
