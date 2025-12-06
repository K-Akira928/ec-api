import z from "zod";
import { ERROR_CODE } from "../../const/http.ts";
import { errorApiResponseDto } from "./errorApiResponseDto.ts";

export const internalErrorResponseDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.INTERNAL),
    message: z.literal("An unexpected error occurred."),
  })
);

export const createInternalErrorResponseDto = (): InternalErrorResponseDto => ({
  success: false,
  error: {
    code: ERROR_CODE.INTERNAL,
    message: "An unexpected error occurred.",
  },
});

export type InternalErrorResponseDto = z.infer<typeof internalErrorResponseDto>;
