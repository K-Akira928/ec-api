import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { registry } from "../../docs/swagger.ts";
import { swaggerInternalErrorResponseDto } from "../share/internalErrorResponseDto.ts";
import { successApiResponseDto } from "../share/successApiResponseDto.ts";
import { swaggerValidationErrorResponseDto } from "../share/validationErrorResponseDto.ts";

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

// --- swagger設定 ---
registry.register("CreateExampleRequestDto", createExampleRequestDto);
registry.registerPath({
  method: "post",
  path: "/examples",
  description: "Exampleを作成します",
  summary: "Example作成API",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createExampleRequestDto,
        },
      },
    },
  },
  responses: {
    201: {
      description: "正常に作成",
      content: {
        "application/json": {
          schema: createExampleResponseDto,
        },
      },
    },
    ...swaggerValidationErrorResponseDto,
    ...swaggerInternalErrorResponseDto,
  },
});
