import type { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import type { ResponseObject } from "@asteasolutions/zod-to-openapi/dist/types.js";
import z from "zod";
import { ERROR_CODE, HTTP_STATUS } from "../../const/http.ts";
import { errorApiResponseDto } from "./errorApiResponseDto.ts";

export const invalidParamsDto = z.object({
  name: z.string(),
  reason: z.string(),
});

export const validationErrorResponseDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.VALIDATION),
    message: z.literal("入力内容が不正です"),
    invalidParams: z.array(invalidParamsDto),
  })
);

export const createValidationErrorResponseDto = (
  invalidParams: InvalidParamsDto[]
): ValidationErrorResponseDto => ({
  success: false,
  error: {
    code: ERROR_CODE.VALIDATION,
    message: "入力内容が不正です",
    invalidParams,
  },
});

export type InvalidParamsDto = z.infer<typeof invalidParamsDto>;
export type ValidationErrorResponseDto = z.infer<typeof validationErrorResponseDto>;

// --- swagger設定 ---

export const swaggerValidationErrorResponseDto: Record<number, ResponseObject | ResponseConfig> = {
  [HTTP_STATUS.BAD_REQUEST]: {
    description: "入力内容が不正",
    content: {
      "application/json": {
        schema: validationErrorResponseDto,
      },
    },
  },
};
