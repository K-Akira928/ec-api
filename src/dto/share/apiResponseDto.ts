import z from "zod";
import { ERROR_CODE } from "../../const/http.ts";

export const successApiResponseDto = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.literal(true),
    data: data.optional(),
  });

export const errorApiResponseDto = <T extends z.ZodTypeAny>(error: T) =>
  z.object({
    success: z.literal(false),
    error: error,
  });

export const internalErrorDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.INTERNAL),
    message: z.literal("An unexpected error occurred."),
  })
);

export const notFoundErrorDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.NOT_FOUND),
    message: z.string(),
  })
);

export const invalidParamsDto = z.object({
  name: z.string(),
  reason: z.string(),
});

export const validationErrorDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.VALIDATION),
    message: z.literal("One or more fields failed validation checks."),
    invalidParams: z.array(invalidParamsDto),
  })
);

export type SuccessApiResponseDto = z.infer<ReturnType<typeof successApiResponseDto>>;
export type ErrorApiResponseDto = z.infer<ReturnType<typeof errorApiResponseDto>>;
export type InternalErrorDto = z.infer<typeof internalErrorDto>;
export type NotFoundErrorDto = z.infer<typeof notFoundErrorDto>;
export type InvalidParamsDto = z.infer<typeof invalidParamsDto>;
export type ValidationErrorDto = z.infer<typeof validationErrorDto>;
