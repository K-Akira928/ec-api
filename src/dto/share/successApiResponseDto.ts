import z from "zod";

export const successApiResponseDto = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.literal(true),
    data: data.optional(),
  });

export type SuccessApiResponseDto = z.infer<ReturnType<typeof successApiResponseDto>>;
