import z from "zod";

export const errorApiResponseDto = <T extends z.ZodTypeAny>(error: T) =>
  z.object({
    success: z.literal(false),
    error: error,
  });

export type ErrorApiResponseDto = z.infer<ReturnType<typeof errorApiResponseDto>>;
