import z from "zod";
import { ERROR_CODE } from "../../const/http.ts";
import { errorApiResponseDto } from "./errorApiResponseDto.ts";

export const notFoundErrorResponseDto = errorApiResponseDto(
  z.object({
    code: z.literal(ERROR_CODE.NOT_FOUND),
    message: z.string(),
  })
);
export const createNotFoundErrorResponseDto = (message: string): NotFoundErrorResponseDto => ({
  success: false,
  error: {
    code: ERROR_CODE.NOT_FOUND,
    message,
  },
});

export type NotFoundErrorResponseDto = z.infer<typeof notFoundErrorResponseDto>;
