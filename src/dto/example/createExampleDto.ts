import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { successApiResponseDto } from "../share/successApiResponseDto.ts";

extendZodWithOpenApi(z);

export const createExampleRequestDto = z
  .object({
    name: z.string("名前は文字列で入力してください").min(1, "名前は必須です").openapi({
      description: "ユーザー名",
      example: "田中 雅也",
    }),
    nickname: z.string("ニックネームは文字列で入力してください").optional().openapi({
      description: "ニックネーム",
      example: "マサヤ",
    }),
  })
  .openapi("CreateExampleRequestDto");

export const createExampleResponseDto = successApiResponseDto(z.object({})).omit({ data: true });

export type CreateExampleRequestDto = z.infer<typeof createExampleRequestDto>;
export type CreateExampleResponseDto = z.infer<typeof createExampleResponseDto>;
