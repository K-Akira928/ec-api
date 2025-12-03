import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const createExampleRequestDto = z
  .object({
    name: z.string().min(1, "名前は必須です").openapi({
      description: "ユーザー名",
      example: "田中 雅也",
    }),
    nickname: z.string().optional().openapi({
      description: "ニックネーム",
      example: "マサヤ",
    }),
  })
  .openapi("CreateExampleRequestDto");

export type CreateExampleRequestDto = z.infer<typeof createExampleRequestDto>;
