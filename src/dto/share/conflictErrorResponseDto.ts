import z from "zod";
import { ERROR_CODE } from "../../const/http.ts";
import { errorApiResponseDto } from "./errorApiResponseDto.ts";

export const conflictErrorResponseDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.CONFLICT),
    message: z.literal("リソースが既に存在します"),
  })
);

export const createConflictErrorResponseDto = (): ConflictErrorResponseDto => ({
  success: false,
  error: {
    code: ERROR_CODE.CONFLICT,
    message: "リソースが既に存在します",
  },
});

export type ConflictErrorResponseDto = z.infer<typeof conflictErrorResponseDto>;
