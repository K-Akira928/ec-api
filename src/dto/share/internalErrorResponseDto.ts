import type { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import type { ResponseObject } from "@asteasolutions/zod-to-openapi/dist/types.js";
import z from "zod";
import { ERROR_CODE, HTTP_STATUS } from "../../const/http.ts";
import { errorApiResponseDto } from "./errorApiResponseDto.ts";

export const internalErrorResponseDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.INTERNAL),
    message: z.literal("予期せぬエラーが発生しました"),
  })
);

export const createInternalErrorResponseDto = (): InternalErrorResponseDto => ({
  success: false,
  error: {
    code: ERROR_CODE.INTERNAL,
    message: "予期せぬエラーが発生しました",
  },
});

export type InternalErrorResponseDto = z.infer<typeof internalErrorResponseDto>;

// --- swagger設定 ---

export const swaggerInternalErrorResponseDto: Record<number, ResponseObject | ResponseConfig> = {
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: {
    description: "予期せぬエラーが発生",
    content: {
      "application/json": {
        schema: internalErrorResponseDto,
      },
    },
  },
};
