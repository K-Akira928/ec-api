import z from "zod";

export const createExampleRequestDto = z.object({
  name: z.string().min(1, "名前は必須です"),
  nickname: z.string().optional(),
});

export type CreateExampleRequestDto = z.infer<typeof createExampleRequestDto>;
