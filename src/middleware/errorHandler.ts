import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../const/http.ts";
import { createInternalErrorResponseDto } from "../dto/share/internalErrorResponseDto.ts";
import {
  createValidationErrorResponseDto,
  type InvalidParamsDto,
} from "../dto/share/validationErrorResponseDto.ts";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof ZodError) {
    const invalidParams: InvalidParamsDto[] = err.issues.map((issue) => ({
      name: issue.path.join("."),
      reason: issue.message,
    }));

    const response = createValidationErrorResponseDto(invalidParams);
    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }

  const response = createInternalErrorResponseDto();
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
};
