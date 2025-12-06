import z from "zod";
import { ERROR_CODE } from "../../const/http.ts";
import { errorApiResponseDto } from "./errorApiResponseDto.ts";

export const invalidParamsDto = z.object({
  name: z.string(),
  reason: z.string(),
});

export const validationErrorResponseDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.VALIDATION),
    message: z.literal("One or more fields failed validation checks."),
    invalidParams: z.array(invalidParamsDto),
  })
);

export const createValidationErrorResponseDto = (
  invalidParams: InvalidParamsDto[]
): ValidationErrorResponseDto => ({
  success: false,
  error: {
    code: ERROR_CODE.VALIDATION,
    message: "One or more fields failed validation checks.",
    invalidParams,
  },
});

export type InvalidParamsDto = z.infer<typeof invalidParamsDto>;
export type ValidationErrorResponseDto = z.infer<typeof validationErrorResponseDto>;
